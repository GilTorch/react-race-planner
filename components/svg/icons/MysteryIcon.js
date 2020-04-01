import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import PropTypes from 'prop-types';

function SvgComponent({ height, width }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 27.778 27.783">
      <G data-name="Mystery Icon" fill="#fff">
        <Path
          data-name="Icon awesome-search"
          d="M27.4 24.02l-5.409-5.41a1.3 1.3 0 00-.922-.38h-.884a11.28 11.28 0 10-1.953 1.953v.884a1.3 1.3 0 00.38.922L24.02 27.4a1.3 1.3 0 001.839 0l1.535-1.535a1.308 1.308 0 00.006-1.845zm-16.114-5.789a6.945 6.945 0 116.945-6.945 6.941 6.941 0 01-6.945 6.945z"
        />
        <Path
          data-name="Icon awesome-eye"
          d="M20.693 10.615a11.253 11.253 0 00-9.987-6.224 11.255 11.255 0 00-9.978 6.224 1.135 1.135 0 000 1.024 11.253 11.253 0 009.978 6.224 11.255 11.255 0 009.982-6.224 1.135 1.135 0 00.005-1.024zm-9.987 5.564a5.052 5.052 0 115.052-5.052 5.052 5.052 0 01-5.052 5.052zm0-8.42a3.344 3.344 0 00-.884.132 1.679 1.679 0 01-2.347 2.347 3.36 3.36 0 103.231-2.479z"
        />
        <Path data-name="Rectangle 2" d="M6 2h11v4H6z" />
        <Path data-name="Path 7" d="M7.08 16.607h11.391l-4.093 3.584L7.08 19z" />
      </G>
    </Svg>
  );
}

SvgComponent.defaultProps = {
  width: 27.778,
  height: 27.783
};

SvgComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default SvgComponent;
