import React from "react";

interface IconProps {
    size?: number;
    className?: string;
    onlyStrokes?: boolean;
    strokeWidth?: number;
    onClick?: () => void;
}

//Boxicons

export const Icon = {

    Add: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M12 4v16m-8-8h16"></path>
        </IconWrapper>
    ),
    Arrow: {
        Left: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="M21 12H3m0 0 7-7m-7 7 7 7"></path>
            </IconWrapper>
        ),
        Right: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="M3 12h18m0 0-7-7m7 7-7 7"></path>
            </IconWrapper>
        )
    },
    Authorized: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M20.29 8.291 16 12.581l-1.3-1.29-1.41 1.42 2.7 2.7 5.72-5.7-1.42-1.42ZM4 8.001a3.91 3.91 0 0 0 4 4 3.911 3.911 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4Zm6 0a1.91 1.91 0 0 1-2 2 1.911 1.911 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2Zm-6 10a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2v-1Z"></path>
        </IconWrapper>
    ),
    Book: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M21 3h-7a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 3H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h5.758c.526 0 1.042.214 1.414.586l1.121 1.121c.009.009.021.012.03.021.086.079.182.149.294.196h.002a.996.996 0 0 0 .762 0h.002c.112-.047.208-.117.294-.196.009-.009.021-.012.03-.021l1.121-1.121A2.015 2.015 0 0 1 15.242 20H21a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM8.758 18H4V5h6c.552 0 1 .449 1 1v12.689A4.031 4.031 0 0 0 8.758 18ZM20 18h-4.758c-.799 0-1.584.246-2.242.689V6c0-.551.448-1 1-1h6v13Z"></path>
        </IconWrapper>
    ),
    Brain: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M19.864 8.465a3.507 3.507 0 0 0-3.03-4.449A3.005 3.005 0 0 0 14 2a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 2c-1.301 0-2.41.831-2.825 2.015a3.505 3.505 0 0 0-3.039 4.45A4.028 4.028 0 0 0 2 12c0 1.075.428 2.086 1.172 2.832A4.067 4.067 0 0 0 3 16c0 1.957 1.412 3.59 3.306 3.934A3.515 3.515 0 0 0 9.5 22c.979 0 1.864-.407 2.5-1.059a3.483 3.483 0 0 0 4.398.498 3.51 3.51 0 0 0 1.292-1.499 4.006 4.006 0 0 0 3.138-5.108A4.003 4.003 0 0 0 22 12a4.029 4.029 0 0 0-2.136-3.535ZM9.5 20c-.711 0-1.33-.504-1.47-1.198L7.818 18H7c-1.103 0-2-.897-2-2 0-.352.085-.682.253-.981l.456-.816-.784-.51A2.02 2.02 0 0 1 4 12c0-.977.723-1.824 1.682-1.972l1.693-.26-1.059-1.346a1.502 1.502 0 0 1 1.498-2.39L9 6.207V5a1 1 0 0 1 2 0v13.5c0 .827-.673 1.5-1.5 1.5Zm9.575-6.308-.784.51.456.816c.168.3.253.63.253.982 0 1.103-.897 2-2.05 2h-.818l-.162.802A1.502 1.502 0 0 1 14.5 20c-.827 0-1.5-.673-1.5-1.5V5a1 1 0 0 1 1-1c.552 0 1 .448 1 1.05v1.207l1.186-.225a1.502 1.502 0 0 1 1.498 2.39l-1.059 1.347 1.693.26A2.002 2.002 0 0 1 20 12c0 .683-.346 1.315-.925 1.692Z"></path>
        </IconWrapper>
    ),
    Check: {
        NotChecked: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z"></path>
            </IconWrapper>
        ),
        Checked: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8-1.41-1.42Z"></path>
            </IconWrapper>
        ),
    },
    Chevron: {
        Up: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586l-5.707 5.707Z"></path>
            </IconWrapper>
        ),
        Down: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="M16.293 9.297 12 13.59 7.707 9.297 6.293 10.71 12 16.418l5.707-5.707-1.414-1.414Z"></path>
            </IconWrapper>
        ),
    },
    Close: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242-1.414-1.414Z"></path>
        </IconWrapper>
    ),
    Comment: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M7 7h10"></path>
            <path d="M7 11h4"></path>
            <path d="M3 5v15.793a.5.5 0 0 0 .854.353l3.853-3.853A1 1 0 0 1 8.414 17H19a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"></path>
        </IconWrapper>
    ),
    DegreeHat: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="m1 8.7 10.511-4.2 10.511 4.2-10.51 4.2L1 8.7Z"></path>
            <path d="M22.022 8.755v4.611"></path>
            <path d="M5.778 10.913v6.22S8.183 19.5 11.51 19.5s5.733-2.366 5.733-2.366v-6.22"></path>
        </IconWrapper>
    ),
    Download: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M3 14v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"></path>
            <path d="M12 3v14m0 0-5-5.444M12 17l5-5.444"></path>
        </IconWrapper>
    ),
    Edit: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="m18.988 2.016 3 3-2.287 2.288-3-3 2.287-2.288ZM8 16.004h3l7.287-7.287-3-3L8 13.004v3Z"></path>
            <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19Z"></path>
        </IconWrapper>
    ),
    Eye: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M1 12s4-8 11-8 11 8 11 8"></path>
            <path d="M1 12s4 8 11 8 11-8 11-8"></path>
            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
        </IconWrapper>
    ),
    File: {
        Doc: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="M6 22h12a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-5.828-5.828A2 2 0 0 0 12.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z"></path>
                <path d="M13 2.5V9h6"></path>
                <path d="M8 17h7"></path>
                <path d="M8 13h7"></path>
                <path d="M8 9h1"></path>
            </IconWrapper>
        ),
        Image: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="m5 21 11-11 5 5"></path>
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3z"></path>
            </IconWrapper>
        ),
        Video: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
            <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
                <path d="M16.118 12 22 7.333v9.334L16.118 12Zm0 0V7.333A2.343 2.343 0 0 0 13.765 5H4.353A2.343 2.343 0 0 0 2 7.333v9.334A2.343 2.343 0 0 0 4.353 19h9.412c1.3 0 2.353-1.045 2.353-2.333V12Z"></path>
            </IconWrapper>
        )
    },
    Group: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M16.604 11.052a5.67 5.67 0 0 0 .75-3.44c-.178-1.784-1.174-3.361-2.802-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.694 3.694 0 0 1-1.072 2.986L13.1 11.99l1.618.475c4.232 1.24 4.28 5.496 4.28 5.539h2c0-1.79-.955-5.285-4.395-6.952Z"></path>
            <path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4Zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2Zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6Z"></path>
        </IconWrapper>
    ),
    Home: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13Zm9-8.586 6 6V20H6v-9.586l6-6Z"></path>
            <path d="M12 18.003c3.703 0 4.9-3.539 4.95-3.688l-1.9-.621c-.008.022-.781 2.31-3.05 2.31-2.238 0-3.02-2.222-3.051-2.317l-1.9.628c.05.15 1.248 3.688 4.95 3.688Z"></path>
        </IconWrapper>
    ),
    Info: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8Z"></path>
            <path d="M11 11h2v6h-2v-6Zm0-4h2v2h-2V7Z"></path>
        </IconWrapper>
    ),
    Key: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5Zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Z"></path>
        </IconWrapper>
    ),
    LogIn: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="m10.998 16 5-4-5-4v3h-9v2h9v3Z"></path>
            <path d="M12.999 3a8.938 8.938 0 0 0-6.364 2.637l1.414 1.414A6.955 6.955 0 0 1 12.999 5c1.87 0 3.628.729 4.95 2.051a6.955 6.955 0 0 1 2.05 4.95c0 1.87-.728 3.628-2.05 4.95a6.955 6.955 0 0 1-4.95 2.051 6.955 6.955 0 0 1-4.95-2.051l-1.414 1.414a8.938 8.938 0 0 0 6.364 2.637 8.938 8.938 0 0 0 6.364-2.637A8.938 8.938 0 0 0 22 12.001a8.938 8.938 0 0 0-2.637-6.364A8.938 8.938 0 0 0 12.999 3Z"></path>
        </IconWrapper>
    ),
    Play: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M5 21V3l14 9-14 9Z"></path>
        </IconWrapper>
    ),
    Reset: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3Z"></path>
            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-5.057-1.535V2L8 5l3.975 3V6.002a6.961 6.961 0 0 1 3.937 1.193 7.004 7.004 0 0 1 1.894 9.718 7.028 7.028 0 0 1-4.394 2.946 7.13 7.13 0 0 1-2.822 0A7.002 7.002 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22c.61 0 1.217-.061 1.814-.183a9.014 9.014 0 0 0 5.649-3.786A8.952 8.952 0 0 0 21 13c0-.61-.061-1.217-.183-1.814Z"></path>
        </IconWrapper>
    ),
    Search: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8Zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6Z"></path>
        </IconWrapper>
    ),
    Settings: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4Zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2Z"></path>
            <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.723 7.723 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.101 8.101 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733Zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.072 6.072 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108Z"></path>
        </IconWrapper>
    ),
    Star: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="m6.516 14.325-1.49 6.451a.998.998 0 0 0 1.529 1.058L12 18.204l5.445 3.63a1.001 1.001 0 0 0 1.517-1.107l-1.829-6.4 4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454-2.467-5.46a.997.997 0 0 0-1.822 0L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107Zm2.853-4.327a.998.998 0 0 0 .832-.586L12 5.432l1.799 3.98a.998.998 0 0 0 .832.586l3.972.316-3.271 2.944c-.284.256-.397.65-.293 1.018l1.253 4.384-3.736-2.49a.995.995 0 0 0-1.109 0l-3.904 2.602 1.05-4.545a1 1 0 0 0-.276-.94l-3.038-2.963 4.09-.326Z"></path>
        </IconWrapper>
    ),
    StarFull: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M21.947 9.181a1 1 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.997.997 0 0 0-1.822-.001L8.622 8.052l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.204l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065Z"></path>
        </IconWrapper>
    ),
    Time: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
            <path d="M12 6v6l4 4"></path>
        </IconWrapper>
    ),
    Trash: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2v12ZM9 4h6v2H9V4ZM8 8h9v12H7V8h1Z"></path>
            <path d="M9 10h2v8H9v-8Zm4 0h2v8h-2v-8Z"></path>
        </IconWrapper>
    ),
    Trophy: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.799 6.91 4.819 7.012A6.001 6.001 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09a6.01 6.01 0 0 0 4.181-2.898C20.201 14.91 22 12.31 22 8V5a1 1 0 0 0-1-1ZM4 8V6h2v6.83C4.216 12.078 4 9.299 4 8Zm8 8c-2.206 0-4-1.794-4-4V4h8v8c0 2.206-1.794 4-4 4Zm6-3.17V6h2v2c0 1.299-.216 4.078-2 4.83Z"></path>
        </IconWrapper>
    ),
    Upload: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M3 14v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"></path>
            <path d="M12 17V3m0 0L7 8.444M12 3l5 5.444"></path>
        </IconWrapper>
    ),
    User: ({ size, className, onlyStrokes, strokeWidth, onClick }: IconProps) => (
        <IconWrapper size={size} className={className} onlyStrokes={onlyStrokes} strokeWidth={strokeWidth} onClick={onClick}>
            <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1h2Z"></path>
        </IconWrapper>
    )

}

function IconWrapper({ children, size, className, onlyStrokes, strokeWidth, onClick }: { children: React.ReactNode, size?: number, className?: string, onlyStrokes?: boolean, strokeWidth?: number, onClick?: () => void }) {
    return (
        <svg width={size || 46} height={size || 46} fill={onlyStrokes ? "none" : "currentColor"} stroke={onlyStrokes ? "currentColor" : "none"} strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
            {children}
        </svg>
    );
}
