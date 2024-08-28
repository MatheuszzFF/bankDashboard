type TMenuItem = {
    icon: string,
    iconActive: string,
    title: string,
    isActive: boolean
}

export const MenuItem = (props: TMenuItem) => {
    const {
        icon,
        iconActive,
        title,
        isActive
    } = props
    return(
        <li className="text-menuInactive text-[18px] text-medium flex gap-4">
            <img src={`${isActive ? iconActive : icon}`} alt={`icon ${title}`} />
            <span>{title}</span>
        </li>
    )
}