export interface BitcoinChart {
    title: string,
    description: string,
    fill: string,
    stroke: string,
    data: { name: string, value: number }[],
    unit: string,
    x: string,
    y: string
}

