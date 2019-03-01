export const myLogger = store => next => action => {
    console.log(`Action: ${action.type}, Payload:`, action.payload )
    return next(action)
}