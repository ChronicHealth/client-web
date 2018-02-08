// @flow

export const baseActions = {
  create: (name, reducer, service)=>(dispatch)=>(values) => {
    return service.create(values)
    .then((id)=>{
      dispatch(reducer.create({
        id,
        ...values
      }))
      return id
    })
  }
}

export const compose = (props: Array<Object>, name, reducer, service)=>{
  return props.reduce((finalResult, prop)=>{
    return {
      ...finalResult,
      ...Object.keys(prop).reduce((fR, propName)=>{
        return {
          ...fR,
          [propName]: prop[propName](name, reducer, service),
        };
      }, {})
    }
  }, {})
}