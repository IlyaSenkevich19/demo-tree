import { FC } from 'react';
import { TIconNames } from 'src/@types/IconNames';

export interface IIconProps {
    iconName: TIconNames;
    className?: string;
    style?: React.CSSProperties;
    width?: string;
    height?: string;
}

const IconComponent: FC<IIconProps> = ({
    iconName,
    className = '',
    style,
    width = '1em',
    height = '1em',
    ...svgProps
}) => {
    return (
        <svg
            className={`icons ${className}`}
            style={{
                stroke: 'currentColor',
                fill: 'currentColor',
                strokeWidth: 0,
                height: height,
                width: width,
                verticalAlign: 'middle',
                ...style,
            }}
            aria-hidden="true"
            {...svgProps}
        >
            <use xlinkHref={`../../../assets/svg/sprite.icons.svg#${iconName}`} />
        </svg>
    );
};

export default IconComponent;