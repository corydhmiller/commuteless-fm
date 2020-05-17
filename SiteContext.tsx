import React from "react"

const SiteContext = React.createContext(null)

export const SiteProvider = SiteContext.Provider
export const SiteConsumer = SiteContext.Consumer

export default SiteContext
