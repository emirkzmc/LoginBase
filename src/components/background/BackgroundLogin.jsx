export default function Background({ children }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9] -z-20">

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -bottom-[150px] -left-[150px] w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] max-w-[700px] max-h-[700px] bg-gradient-to-br from-[#7DE198] via-[#24AC6D] to-[#009951] rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
        

        <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] min-w-[250px] min-h-[250px] max-w-[450px] max-h-[450px] bg-gradient-to-br from-[#BFF3CD] via-[#7DE198] to-[#24AC6D] rounded-full opacity-25 blur-2xl"></div>
        
        <div className="absolute top-[60%] left-[20%] w-[20vw] h-[20vw] min-w-[150px] min-h-[150px] max-w-[250px] max-h-[250px] bg-gradient-to-br from-[#24AC6D] to-[#009951] rounded-full opacity-20 blur-xl"></div>
      </div>


      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-between w-full max-w-7xl px-8 gap-12">

          


          <div className="relative z-20 flex items-center justify-center flex-1 w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
