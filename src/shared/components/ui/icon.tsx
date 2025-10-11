"use client";
import React, { useEffect, useState } from "react";

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
    /** SVG 파일명 (확장자 제외) */
    name: string;
    /** 아이콘 크기 (width, height 동시 적용) */
    size?: number | string;
    /** SVG의 stroke 색상 */
    stroke?: string;
    /** SVG의 fill 색상 */
    fill?: string;
    /** SVG의 stroke-width */
    strokeWidth?: number | string;
    /** 커스텀 className */
    className?: string;
}

/**
 * SVG 아이콘 컴포넌트
 *
 * @example
 * ```tsx
 * <Icon name="logo" size={24} fill="#667eea" />
 * <Icon name="arrow-right" size={16} stroke="currentColor" strokeWidth={2} />
 * <Icon name="chat" size={32} stroke="#764ba2" fill="none" strokeWidth={2} />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    stroke,
    fill,
    strokeWidth,
    className = "",
    width,
    height,
    style,
    ...rest
}) => {
    const [svgContent, setSvgContent] = useState<string>("");
    const svgPath = `/assets/svgs/${name}.svg`;

    // size prop이 있으면 width, height보다 우선
    const finalWidth = width || size;
    const finalHeight = height || size;

    useEffect(() => {
        fetch(svgPath)
            .then(res => res.text())
            .then(text => {
                // SVG 태그에서 기존 속성 제거하고 새로운 속성 추가
                let modifiedSvg = text.replace(/<svg([^>]*)>/, (match, attrs) => {
                    return `<svg${attrs}>`;
                });
                setSvgContent(modifiedSvg);
            })
            .catch(err => {
                console.error(`Failed to load SVG: ${svgPath}`, err);
            });
    }, [svgPath]);

    const svgStyle: React.CSSProperties = {
        width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
        height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
    };

    return (
        <span
            className={className}
            style={svgStyle}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            {...(rest as any)}
        />
    );
};

/**
 * 간단한 img 태그 기반 SVG 아이콘 컴포넌트
 * stroke, fill 속성 제어가 필요없을 때 사용 (더 가볍고 빠름)
 */
export const SimpleIcon: React.FC<IconProps> = ({
    name,
    size = 24,
    className = "",
    width,
    height,
    style,
    ...rest
}) => {
    const svgPath = `/assets/svgs/${name}.svg`;
    const finalWidth = width || size;
    const finalHeight = height || size;

    return (
        <img
            src={svgPath}
            alt={name}
            className={className}
            width={typeof finalWidth === 'number' ? finalWidth : undefined}
            height={typeof finalHeight === 'number' ? finalHeight : undefined}
            style={{
                width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
                height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
                display: 'inline-block',
                verticalAlign: 'middle',
                ...style,
            }}
            {...(rest as any)}
        />
    );
};

export default Icon;
