export interface IDashboardProp {
    id?: number,
    type?: string,
    category?: string,
    value?: string
}
export interface IDashboardItem {
    dashboard?: IDashboardProp[]
    name?: string
    _id?: string
}