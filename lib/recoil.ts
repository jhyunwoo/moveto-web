import { atom } from "recoil"

const accessCode = atom({
  key: "accessCode",
  default: "",
})

const alertState = atom({
  key: "alertState",
  default: { message: "", warn: false, error: false },
})

const alertWithLinkState = atom({
  key: "alertWithLinkState",
  default: { message: "", link: "" },
})

const loadingState = atom({
  key: "loadingState",
  default: false,
})

const confirmActionState = atom({
  key: "confirmActionState",
  default: { message: "", action: () => {} },
})

export {
  accessCode,
  alertState,
  loadingState,
  alertWithLinkState,
  confirmActionState,
}
