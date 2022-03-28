export default `
  p {
    margin: 0;
    padding: 0;
  }
  
  .container {
    height: 1000px;
    background-color: #E8DEDB;
    padding: 0 0 0 10px;
    display: flex;
    justify-content: center;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    flex-basis: 25%;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .content {
    flex-basis: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .drop-box {
    position: relative;
    width: 90%;
    height: 45%; 
    background-color: white;
    overflow: hidden;
  }

  .active {
    border: dashed 2px lightsalmon;
  }

  .record-box {
    width: 100%;
  }

  .record-link {
    text-decoration: none;
    color: black;
  }

  .record-card {
    position: relative;
    min-height: 75px;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: 1px solid rgb(230,230,230);
    border-radius: 5px;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .unselected {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .record-title {
    font-weight: 700;
  }

  .record-card-thumbnail {
    display: block;
    width: 75px;
  }

  .img-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    cursor: pointer;
    width: fit-content;
    height: fit-content;
  }

  .img-wrap .close {
    position: absolute;
    top: -15px;
    right: -7px;
    font-size: 1.5rem;
    z-index: 100;
    cursor: pointer;
  }

  .img-wrap .close:hover {
    color: red;
  }

  .img-wrap .resize-active {
    position: absolute;
    bottom: -11px;
    right: -10px;
    font-size: 1.5rem;
    z-index: 100;
    cursor: se-resize;
    transform: rotate(45deg);
  }

  .img-wrap .resize-active:hover {
    color: red;
  }

  .select-item {
    border: solid 2px red;
  }
  
  h3 {
    margin-bottom: 5px;
  }

  .pop-of-color-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
  }

  .recordcard-overlay-div {
    position: absolute;
    display: flex;
    padding-left: 10px;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    background: rgba(240,240,240, 0.9);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .recordcard-overlay-div > div {
    max-width: 150px;
  }

  .recordcard-overlay-div > div > p > span {
    font-weight: 600;
  }

  .overlay-div {
    position: absolute;
    background: rgba(240,240,240, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
  }  

  .overlay-p {
    color: black;
    font-size: 1rem;
  }

  .overlay-title {
    font-weight: 600;
  }

  .checkout {
    position: absolute;
    width: 100%;
    background: rgba(240,240,240,0.8);
    bottom: 0;
    right: 0;
  }

  .expand-checkout {
    position: absolute;
    right: 0;
    top: -40px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: white;
    background-color: rgba(50,50,50, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkout-content {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .set {
    flex-basis: 40%;
    align-self: flex-start;
  }

  .checkout-button {
    padding: 20px;
    border: 0;
    cursor: pointer;
  }
`;
