/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CPENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}