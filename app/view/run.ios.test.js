const rewire = require("rewire")
const run_ios = rewire("./run.ios")
const RunningView = run_ios.__get__("RunningView")

// @ponicode
describe("componentDidMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [[56784, 12, 56784], [12, "bc23a9d531064583ace8f67dad60f6bb", 12], ["bc23a9d531064583ace8f67dad60f6bb", 12, 12345]]
        inst = new RunningView(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentWillUnMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["a1969970175", "a1969970175", 12], [56784, "bc23a9d531064583ace8f67dad60f6bb", 12], ["bc23a9d531064583ace8f67dad60f6bb", "a1969970175", "bc23a9d531064583ace8f67dad60f6bb"]]
        inst = new RunningView(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentWillUnMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("start", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["bc23a9d531064583ace8f67dad60f6bb", 56784, "bc23a9d531064583ace8f67dad60f6bb"], [987650, 56784, "a1969970175"], ["a1969970175", 12345, 12345]]
        inst = new RunningView(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.start()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("showLocation", () => {
    let object
    let inst

    beforeEach(() => {
        object = [[12345, 987650, 12345], [987650, 12345, 56784], [12, 987650, 56784]]
        inst = new RunningView(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.showLocation()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("stop", () => {
    let object
    let inst

    beforeEach(() => {
        object = [[12345, 12345, 987650], [12345, "bc23a9d531064583ace8f67dad60f6bb", 12345], [12345, 56784, 56784]]
        inst = new RunningView(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.stop()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("backToHome", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["bc23a9d531064583ace8f67dad60f6bb", 12345, 12345], ["a1969970175", "a1969970175", 56784], [12345, "bc23a9d531064583ace8f67dad60f6bb", 987650]]
        inst = new RunningView(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.backToHome()
        }
    
        expect(callFunction).not.toThrow()
    })
})
