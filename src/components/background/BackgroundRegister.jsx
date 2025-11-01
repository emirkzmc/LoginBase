export default function Background({ children }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#E3F2FD] via-white to-[#EBF5FF] -z-20">

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -bottom-[150px] right-[-100px] w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] max-w-[700px] max-h-[700px] bg-gradient-to-br from-[#569ADD] via-[#00A6FF] to-[#0D5080] rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
        
        <div className="absolute top-[15%] left-[10%] w-[40vw] h-[40vw] min-w-[250px] min-h-[250px] max-w-[450px] max-h-[450px] bg-gradient-to-br from-[#BFD4F3] via-[#569ADD] to-[#00A6FF] rounded-full opacity-25 blur-2xl"></div>
        
        <div className="absolute top-[50%] right-[25%] w-[20vw] h-[20vw] min-w-[150px] min-h-[150px] max-w-[250px] max-h-[250px] bg-gradient-to-br from-[#00A6FF] to-[#0D5080] rounded-full opacity-20 blur-xl"></div>
      </div>


      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-between w-full max-w-7xl px-8 gap-12">
          <div className="relative z-20 flex items-center justify-center flex-1 w-full order-2 lg:order-1">
            {children}
          </div>

          
        </div>
      </div>
    </div>
  );
}
