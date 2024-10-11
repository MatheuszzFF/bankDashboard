import { Link } from 'react-router-dom';

type TMenuItem = {
    icon: string,
    iconActive: string,
    title: string,
    isActive: boolean,
    path: string,
    onClick: () => void
}

export const MenuItem = (props: TMenuItem) => {
    const {
        icon,
        iconActive,
        title,
        isActive,
        path,
        onClick
    } = props

    return(
        <li className='list-none relative py-2 pl-[40px]' onClick={onClick} >
            <Link to={path} className={`${isActive && `text-primary`} text-menuInactive text-[18px] text-medium flex gap-10 items-center`}>
                <img src={`${isActive ? iconActive : icon}`} alt={`icon ${title}`} className="object-contain" />
                <span className="text-18">{title}</span>
            </Link>
            {isActive && <div className="bg-primary absolute -left-[1px] top-0 h-full w-[6px] border-l" style={{ borderRadius: '0px 10px 10px 0px' }}></div>}
        </li>
    )
}