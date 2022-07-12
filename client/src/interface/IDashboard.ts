export interface IDashboardProp {
    id?: number,
    type?: string,
    category?: string,
    value?: string
}
export interface IDashboardItem {
    pie: IDashboardProp,
    line: IDashboardProp,
    bar: IDashboardProp,
    radar: IDashboardProp,
    segment: {
        country: IDashboardProp,
        gender: IDashboardProp,
        device: IDashboardProp
    }
}