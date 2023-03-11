import React from "react";
import "./SelectImage.css";
import Button from "../Button/Button";
import Input from "../Input/Input"
import {
  theme,
  eyesMap,
  eyebrowsMap,
  mouthsMap,
  hairMap,
  facialHairMap,
  clothingMap,
  accessoryMap,
  graphicsMap,
  hatMap,
  bodyMap,
} from '@bigheads/core'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function FileSelect({
  handleFileSelect,
  cancel,
  submit,
}) {


  // function selectRandomKey<T extends {}>(object: T) {
  //   return (Object.keys(object) as Array<keyof typeof object>)[
  //     Math.floor(Math.random() * Object.keys(object).length)
  //   ]
  // }

  function selectRandomKey(list) {
    return list[Math.floor(Math.random() * list.length)]
  }

  function getRandomOptions() {
    const skinTone = selectRandomKey(theme.colors.skin)
    const eyes = selectRandomKey(eyesMap)
    const eyebrows = selectRandomKey(eyebrowsMap)
    const mouth = selectRandomKey(mouthsMap)
    const hair = selectRandomKey(hairMap)
    const facialHair = selectRandomKey(facialHairMap)
    const clothing = selectRandomKey(clothingMap)
    const accessory = selectRandomKey(accessoryMap)
    const graphic = selectRandomKey(graphicsMap)
    const hat = selectRandomKey(hatMap)
    const body = selectRandomKey(bodyMap)

    const hairColor = selectRandomKey(theme.colors.hair)
    const clothingColor = selectRandomKey(theme.colors.clothing)
    const circleColor = selectRandomKey(theme.colors.bgColors)
    const lipColor = selectRandomKey(theme.colors.lipColors)
    const hatColor = selectRandomKey(theme.colors.clothing)
    const faceMaskColor = selectRandomKey(theme.colors.clothing)

    const mask = true
    const faceMask = false
    const lashes = Math.random() > 0.5

    return {
      skinTone,
      eyes,
      eyebrows,
      mouth,
      hair,
      facialHair,
      clothing,
      accessory,
      graphic,
      hat,
      body,
      hairColor,
      clothingColor,
      circleColor,
      lipColor,
      hatColor,
      faceMaskColor,
      mask,
      faceMask,
      lashes,
    }
  }

  getRandomOptions()



  return (
    <form className="FileSelect" onSubmit={submit.action}>

      <div className="wrapper">
        <div className="absolute">
          <div className="attach-file">
            <i><CloudUploadOutlinedIcon /></i>
            <span>Browse to upload a picture</span>
          </div>
        </div>
        <input type="file" className="input-select" onChange={handleFileSelect}></input>
      </div>
      <div className="buttons">
        <Button type="submit" action={submit.action} variant="primary" >
          {submit.label || "Submit"}
        </Button>
        {cancel && (
          <Button action={cancel.action} variant="secondary">
            {cancel.label}
          </Button>
        )}
      </div>
    </form>
  );
}

export default FileSelect;
