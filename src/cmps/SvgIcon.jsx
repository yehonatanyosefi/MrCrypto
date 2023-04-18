import { getSvg } from '../services/svg.service'

export const SvgIcon = ({ iconName }) => {
     const svgMarkup = getSvg(iconName)
     return <span dangerouslySetInnerHTML={{ __html: svgMarkup }} className="svg-icon" ></span>
}