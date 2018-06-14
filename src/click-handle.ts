holding = false;
handleThingOn = () => {
    if(holding) return;
    functions.gotoNextChord()
    holding = true
}
handleThingOff = () => {
    holding = false
}



document.body.addEventListener('keydown', (e) => {
    console.log(e)
    if(e.key === 'ContextMenu')
    handleThingOn()

})

document.body.addEventListener('keyup', (e) => {
    console.log(e)
    if(e.key === 'ContextMenu')
    handleThingOff()

})
