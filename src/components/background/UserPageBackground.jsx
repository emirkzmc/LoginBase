export default function UserPage({children}) {

    return(
<div className='f overflow-y-hidden flex-1 dark:bg-gradient-to-b dark:from-blue-400 dark:to-blue-900 bg-gradient-to-br from-blue-200 to-blue-400 '>
    {children}
</div>
    );
}