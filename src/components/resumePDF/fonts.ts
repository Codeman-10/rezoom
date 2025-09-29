import { Font } from "@react-pdf/renderer"

export function registerFonts() {
  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTcviYw.woff2",
      },
    ],
  })

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.woff2",
      },
    ],
  })
}
