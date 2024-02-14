import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react(), svgr()],
//     server: {
//         host: true,
//         strictPort: true,
//         watch: {
//             usePolling: true,
//         },
//     },
// }) => {
//     const env = loadEnv(mode, process.cwd(), ''),
//     return {
//         base: JSON.stringify(env.VITE_BASE),
//     }
// }

// export default defineConfig(() => ({
//     plugins: [react(), svgr()],
//     server: {
//         host: true,
//         strictPort: true,
//         watch: {
//             usePolling: true,
//         },
//     },
//     const env = loadEnv(mode, process.cwd(), ''),

//     base: JSON.stringify(env.VITE_BASE),

// }))

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    if (command === 'serve') {
        return {
            plugins: [react(), svgr()],
            server: {
                host: true,
                strictPort: true,
                watch: {
                    usePolling: true,
                },
            },
        }
    } else {
        return {
            plugins: [react(), svgr()],
            server: {
                host: true,
                strictPort: true,
                watch: {
                    usePolling: true,
                },
            },
            base: JSON.stringify(env.VITE_BASE),
        }
    }
})
