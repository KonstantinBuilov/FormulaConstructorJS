const styleComponent = () => {
  const styleBlock = document.createElement('style')
  styleBlock.textContent = `.fbutton, .block, .sign, .brakets, .fresult {
        margin: 0.5vh 0.5vw 0.5vh 0.5vw;
        padding: 0.5vh 0.5vw 0.5vh 0.5vw;
        border: none;
        border-radius: 5px;
        background: #e7e7e7;
        -webkit-box-shadow: 5px 5px 10px #9b9b9b, -5px -5px 10px white;
                box-shadow: 5px 5px 10px #9b9b9b, -5px -5px 10px white;
        -webkit-transition: -webkit-transform .2s;
        transition: -webkit-transform .2s;
        transition: transform .2s;
        transition: transform .2s, -webkit-transform .2s;
      }
      
      .fbutton:focus, .block:focus, .sign:focus, .brakets:focus, .fresult:focus {
        outline: none;
      }
      
      .fconstructor, .finput {
        border-radius: 10px;
        background: #e7e7e7;
        -webkit-box-shadow: inset 5px 5px 10px #9b9b9b, inset -5px -5px 10px white;
                box-shadow: inset 5px 5px 10px #9b9b9b, inset -5px -5px 10px white;
      }
      
      .fcontainer {
        font-family: sans-serif;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
      }
      
      .fbuttons {
        margin: 5px;
      }
      
      .fbutton {
        -webkit-transition: background .2s;
        transition: background .2s;
      }
      
      .fbutton:hover {
        background: #f4f4f4;
      }
      
      .fbutton:active {
        background: #cecece;
      }
      
      .fconstructor {
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 10px;
        margin: 10px;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
            -ms-flex-direction: row;
                flex-direction: row;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
      }
      
      .block {
        height: 1.5rem;
        width: 4rem;
        display: inline-block;
      }
      
      .sign {
        width: 1rem;
        height: 1rem;
        text-align: center;
      }
      
      .brakets {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        min-height: 3rem;
        min-width: 3rem;
        border-left: 1px solid #817f7f;
        border-right: 1px solid #817f7f;
      }
      
      .dragging {
        opacity: .5;
      }
      
      input[type="number"] {
        -moz-appearance: textfield;
      }
      
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      
      .finput {
        border: none;
        margin: 0.5vh 0.5vw 0.5vh 0.5vw;
        padding: 0.5vh 0.5vw 0.5vh 0.5vw;
      }
      
      .finput:focus {
        outline: none;
      }`
  return styleBlock
}