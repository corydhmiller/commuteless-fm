import React from "react"
class SubscribeForm extends React.Component {
  componentDidMount() {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://kyle-adams.ck.page/d4331fde99/index.js"
    script.setAttribute("data-uid", "d4331fde99")
    document.getElementById("subscribe_form").appendChild(script)
  }
  render() {
    return (
      <>
        <div id="subscribe_form" />
      </>
    )
  }
}

export default SubscribeForm
