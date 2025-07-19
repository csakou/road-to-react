type ImageProps = {
    height?: number;
    width?: number;
    src: string;
    srcSet?: string;
    altText?: string;
    styleOptions?: string;
};

export function Image({
    height,
    width,
    src,
    srcSet,
    altText = '',
    styleOptions = '',
}: Readonly<ImageProps>) {
    return (
        <img
            className={`cmp-image ${styleOptions}`}
            height={height}
            width={width}
            srcSet={srcSet}
            src={src}
            alt={altText}
        />
    );
}