// @flow

import { erActions } from '@client/utils/actions';
// import { entity } from '@client/reducers/prescriptionResults'
import service from '@client/services/prescriptionResults';
import moment from 'moment';
import { List } from 'immutable';
import PrescriptionScope from '../../models/Prescription/Scope';
import Prescription from '@client/models/Prescription';

// const base = baseActions('prescriptionResults', entity, service)
const { get } = erActions('prescriptionResults');

const _getPrescriptionFrequency = (prescriptions, clientScopes) => {
  const clientScopeMap = clientScopes.reduce((finalResult, scopeId) => {
    finalResult[scopeId] = true;
    return finalResult;
  }, {});
  return prescriptions.reduce((beforeFinalResult, prescription) => {
    beforeFinalResult[prescription.id] = prescription.scopes.reduce(
      (finalResult, scope) => {
        if (!scope.scopes || !scope.scopes.length) {
          return scope;
        }
        const validScope = scope.scopes.reduce((fFinalResult, scopeId) => {
          if (!fFinalResult) return false;
          if (clientScopeMap[scopeId]) {
            return true;
          }
          return false;
        }, true);
        if (validScope) {
          return scope;
        }
        return finalResult;
      },
      new PrescriptionScope()
    );
    return beforeFinalResult;
  }, {});
};

module.exports = {
  _getPrescriptionFrequency,
  get: (clientId: $$id, date: moment) => (dispatch: $$dispatch) => {
    return service.get(clientId, date).then(prescriptionResult => {
      dispatch(
        get({
          date,
          ...prescriptionResult
        })
      );
      return prescriptionResult;
    });
  },
  update: (
    { clientId, date }: { clientId: $$id, date: string },
    data: Object
  ) => (dispatch: $$dispatch) => {
    dispatch(get({ date, data }));
    return service.update(`${clientId}`, { date, data });
  },
  getPrevious: (clientId: $$id, date: moment) => (dispatch: $$dispatch) => {
    return service.getPrevious(clientId, date).then(previousPR => {
      if (previousPR && previousPR.data) {
        dispatch(
          get({
            date,
            data: Object.keys(previousPR.data).reduce(
              (finalResult, prescriptionId) => {
                finalResult[prescriptionId] = {
                  ...previousPR.data[prescriptionId],
                  active: false
                };
                return finalResult;
              },
              {}
            )
          })
        );
      }
    });
  },
  getWeek: (
    clientId: $$id,
    date: moment,
    prescriptions: List<Prescription>,
    clientScopes: List<$$id>
  ) => (dispatch: $$dispatch) => {
    const startDate = new moment('January 3, 1971');
    const daysBetween = date.diff(startDate, 'days');
    const prescriptionFrequency = _getPrescriptionFrequency(
      prescriptions,
      clientScopes
    );
    return service.getWeek(clientId, date).then(weekPRs => {
      if (weekPRs && weekPRs.length) {
        const pRMapByDates = weekPRs.reduce((finalResult, pR) => {
          finalResult[moment(pR.date).format('YYYY-MM-DD')] = pR;
          return finalResult;
        }, {});
        const data = prescriptions.reduce((finalResult, prescription) => {
          const prescriptionId = prescription.id;
          const { amountFrequency, amountTime } = prescriptionFrequency[
            prescriptionId
          ];
          const frequency = Number(amountFrequency);
          if (frequency > 0) {
            let daysForward = daysBetween % frequency;
            while (daysForward > 0) {
              const nextDate = moment(date)
                .subtract(daysForward, 'days')
                .format('YYYY-MM-DD');
              const pR = pRMapByDates[nextDate];
              if (!finalResult[prescriptionId]) {
                finalResult[prescriptionId] = {
                  amountTime,
                  amountFrequency: frequency
                };
              }
              if (pR && pR.data) {
                const prescriptionWeek = finalResult[prescriptionId];

                prescriptionWeek.nominator =
                  (prescriptionWeek.nominator || 0) +
                  Number(pR.data[prescriptionId].active || 0);
              }
              --daysForward;
            }
          }
          return finalResult;
        }, {});
        dispatch(get({ date, data }));
      }
    });
  },
  getRange: (clientId: $$id, startDate: moment, endDate: moment) => (
    dispatch: $$dispatch
  ) => {
    return service.getRange(clientId, { startDate, endDate });
  }
};
