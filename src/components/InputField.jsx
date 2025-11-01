import Input from "./Input";

const iconPaths = {
  user: {
    path: "M29.6667 31.125V28.2083C29.6667 26.6612 29.0521 25.1775 27.9581 24.0835C26.8642 22.9896 25.3804 22.375 23.8333 22.375H12.1667C10.6196 22.375 9.13585 22.9896 8.04189 24.0835C6.94792 25.1775 6.33334 26.6612 6.33334 28.2083V31.125M23.8333 10.7083C23.8333 13.93 21.2217 16.5417 18 16.5417C14.7783 16.5417 12.1667 13.93 12.1667 10.7083C12.1667 7.48667 14.7783 4.875 18 4.875C21.2217 4.875 23.8333 7.48667 23.8333 10.7083Z",
    position: "top-1/2 -translate-y-1/2"
  },
  email: {
    path: "M29.6667 31.125V28.2083C29.6667 26.6612 29.0521 25.1775 27.9581 24.0835C26.8642 22.9896 25.3804 22.375 23.8333 22.375H12.1667C10.6196 22.375 9.13585 22.9896 8.04189 24.0835C6.94792 25.1775 6.33334 26.6612 6.33334 28.2083V31.125M23.8333 10.7083C23.8333 13.93 21.2217 16.5417 18 16.5417C14.7783 16.5417 12.1667 13.93 12.1667 10.7083C12.1667 7.48667 14.7783 4.875 18 4.875C21.2217 4.875 23.8333 7.48667 23.8333 10.7083Z",
    position: "top-1/2 -translate-y-1/2"
  },
  emailBox: {
    path1: "M6 6H30C31.65 6 33 7.35 33 9V27C33 28.65 31.65 30 30 30H6C4.35 30 3 28.65 3 27V9C3 7.35 4.35 6 6 6Z",
    path2: "M33 9L18 19.5L3 9",
    position: "top-1/2 -translate-y-1/2"
  },
  password: {
    path: "M10.7083 16.5417V10.7083C10.7083 8.77445 11.4766 6.91979 12.844 5.55234C14.2115 4.18488 16.0661 3.41666 18 3.41666C19.9339 3.41666 21.7885 4.18488 23.156 5.55234C24.5234 6.91979 25.2917 8.77445 25.2917 10.7083V16.5417M7.79167 16.5417H28.2083C29.8192 16.5417 31.125 17.8475 31.125 19.4583V29.6667C31.125 31.2775 29.8192 32.5833 28.2083 32.5833H7.79167C6.18084 32.5833 4.875 31.2775 4.875 29.6667V19.4583C4.875 17.8475 6.18084 16.5417 7.79167 16.5417Z",
    position: "top-7 -translate-y-7"
  }
};

export default function InputField({
  iconType = "user",
  placeholder = "",
  value,
  onChange,
  typee = "text",
  iconColor = "#009951",
  focusBorderColor = "#24AC6D",
  showPassword = false,
  className = "",
  required = false
}) {
  const icon = iconPaths[iconType];

  return (
    <div className={`relative w-[284px] ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute left-0 ${icon.position}`}
        style={{ color: iconColor }}
      >
        {iconType === "emailBox" ? (
          <>
            <path d={icon.path1} stroke={iconColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d={icon.path2} stroke={iconColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </>
        ) : (
          <path
            d={icon.path}
            stroke={iconColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      <Input
        placeholder={placeholder}
        typee={typee}
        value={value}
        onChange={onChange}
        showPassword={showPassword}
        className="pl-10 placeholder:pl-2 border-b-[2px] border-[#BEB0B0] w-full h-7 focus:outline-0"
        style={{
          borderBottomColor: '#BEB0B0'
        }}
        onFocus={(e) => {
          e.target.style.borderBottomColor = focusBorderColor;
        }}
        onBlur={(e) => {
          e.target.style.borderBottomColor = '#BEB0B0';
        }}
        required={required}
      />
    </div>
  );
}

