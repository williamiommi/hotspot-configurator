interface LogoIconProps extends React.SVGAttributes<HTMLOrSVGElement> {}

const LogoIcon = (props: LogoIconProps) => (
  <svg
    data-name="Contentful (dark)"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 145 165"
    {...props}
  >
    <path
      d="M49.22 115.5A45.64 45.64 0 0 1 36 83.11a45.16 45.16 0 0 1 13.45-32.27 18 18 0 1 0-25.36-25.47 81.67 81.67 0 0 0-.35 115.49 18 18 0 1 0 25.48-25.36Z"
      style={{ fill: '#ffda00' }}
    ></path>
    <path
      d="M49.45 50.84a45.79 45.79 0 0 1 64.66.23 18 18 0 1 0 25.47-25.35 81.39 81.39 0 0 0-115.37-.47 18 18 0 1 0 25.24 25.59Z"
      style={{ fill: '#67b3ff' }}
    ></path>
    <path
      d="M114 115.73A45.68 45.68 0 0 1 81.6 129a45.16 45.16 0 0 1-32.27-13.5 18 18 0 1 0-25.47 25.36 81.54 81.54 0 0 0 115.49.46A18 18 0 0 0 114 115.73Z"
      style={{ fill: '#eb5a68' }}
    ></path>
    <path
      d="M49.45 50.84a18 18 0 1 1 .11-25.36 18 18 0 0 1-.11 25.36Z"
      style={{ fill: '#47a1ff' }}
    ></path>
    <path
      d="M49.1 140.86a18 18 0 1 1 .12-25.36 18 18 0 0 1-.12 25.36Z"
      style={{ fill: '#d5465f' }}
    ></path>
  </svg>
);

export default LogoIcon;
