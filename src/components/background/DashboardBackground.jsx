export default function DashboardBackground({ children }) {
    return (
        <div className='flex-1 relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 overflow-hidden'>
        <div className="absolute inset-0 overflow-hidden">
            
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-600/40 to-cyan-300/30 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl"></div>
        {children}
        <div className='absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-50'></div>
        </div>
        </div>
    );
}