declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGElement>>;
    export default content;
}