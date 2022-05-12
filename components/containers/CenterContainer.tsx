import { ReactNode } from 'react'

const CenterContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2 text-gray-800">
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center space-y-4">
                {children}
            </main>
        </div>
    )
}

export default CenterContainer