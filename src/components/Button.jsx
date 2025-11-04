export default function Button({ text, onClick, variant , whattype,className }) {
    let selectedVariants;

    switch (variant) {
        case "primary":
            selectedVariants = "bg-gradient-to-b from-[#BFF3CD] to-[#7DE198] border-[1px] border-[#78E094] w-[300px] h-10 text-xl rounded-4xl hover:from-[#20B447]/25 hover:to-[#20B447]/25 hover:border-[#43A44E] transition hover:duration-300 hover:ease-in-out active:bg-[#24D353] active:border-[#5BB76F] active:text-white";
            break;

        case "secondary":
            selectedVariants = "bg-gradient-to-b from-[#BFD4F3] to-[#5bb9fc] border-[1px] border-[#94cbf2] w-[300px] h-10 text-xl rounded-4xl hover:from-[#00A6FF]/25 hover:to-[#00A6FF]/25 hover:border-[#002340] transition hover:duration-300 hover:ease-in-out active:bg-[#106DA6] active:border-[#3549BB] active:text-white";
            break;

        case "third":
            selectedVariants= "g-gradient-to-b from-[#ff0048] to-[#eb8aa6] border-[1px] border-[#b88a97] w-[300px] h-10 text-xl rounded-4xl hover:from-[#eb8aa6]/25 hover:to-[#eb8aa6]/25 hover:border-[#ed3e70] transition hover:duration-300 hover:ease-in-out active:bg-[#850b2d] active:border-[#450114] active:text-white";
            break;

        case "danger":
            selectedVariants = "bg-gradient-to-b from-[#c94b4b] to-[#e84a4a] border-[1px] border-[#c94b4b] w-[300px] h-10 text-xl rounded-4xl text-white font-semibold hover:from-[#b03a3a] hover:to-[#d43939] hover:border-[#b03a3a] transition-all duration-300 hover:ease-in-out active:from-[#9a2d2d] active:to-[#b82e2e] active:border-[#9a2d2d] shadow-lg hover:shadow-xl hover:shadow-[#c94b4b]/50 hover:scale-105";
            break;

        default:
            selectedVariants = {className};
            break;
    }
    return (
        <>
            <button type={whattype} onClick={onClick} className={`${selectedVariants} ${className}`} >{text}</button>
        </>
    );
}