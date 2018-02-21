// @flow
import * as React from 'react';
import RTLink from 'react-toolbox/lib/link';
import { connect } from 'react-redux';
import { push } from '@client/actions/router';
import { bindActionCreators } from '@client/utils/components';

export class Link extends React.PureComponent<Object> {
  handleLocal = (href: string, event: Event) => {
    event.preventDefault();
    this.props.push(href);
  };
  render() {
    /* eslint-disable */
    const { props: { href, push, ...props } } = this;
    /* eslint-enable */
    const local = href[0] === '/';
    const finalHref = local ? `${process.env.CLIENT_URL || ''}${href}` : href;
    return (
      <RTLink
        {...props}
        onClick={local ? this.handleLocal.bind(this, finalHref) : undefined}
        href={finalHref}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      push
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Link);
