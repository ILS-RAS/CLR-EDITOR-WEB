import { MenuItemType } from "../app/enums/menuItemType";


export class MenuItem {
    title!: string;
    action!: number;
    link!: string;
    icon!: string;
    type: MenuItemType = MenuItemType.Normal;
    
    public constructor(fields: Partial<MenuItem>) {
        Object.assign(this, fields);
    }
}