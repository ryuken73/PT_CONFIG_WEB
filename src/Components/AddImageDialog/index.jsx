import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import BlobImage from './BlobImage';
import styled from 'styled-components';
import useImageDialogState from 'hooks/useImageDialogState';
import axiosRequest from 'lib/axiosRequest';

const CustomDialog = styled(Dialog)`
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: #9f7f7f;
      width: 660px;
      max-width: 800px;
    }
  }
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  grid-column-gap: 10px;
`
const ImageTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const DelButton = styled.div`
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  color: red;
`
const imageExtensions = ['JPG', 'GIF', 'PNG'];
const isValidImage = name => {
  const isValid = imageExtensions.some(extension => {
    return name.toUpperCase().endsWith(extension)
  })
  return isValid;
}

const toArray = obj => {
  return Object.values(obj);
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

// const saveFiles = (images, filesToUpload, reqAborters, updateProgress) => {
//   return images.map((image, index) => {
//     const blob = filesToUpload[index];
//     const {imageName, imageSize, imageId} = image;
//     const params = { fname: `${Date.now()}_${imageName}`, size:imageSize, srcId:imageId };
//     const progressHandler = updateProgress(imageId);
//     const [axiosRequestWithAuth, aborter] = axiosRequest();
//     reqAborters.current.push(aborter);
//     return axiosRequestWithAuth.putAttach(params, blob, progressHandler)
//   });
// };

const saveFile = (imageId, imageName, imageSize, blob, reqAborters, updateProgress) => {
  const params = { fname: `${Date.now()}_${imageName}`, size:imageSize, imageId };
  const progressHandler = updateProgress(imageId);
  const [axiosRequestWithAuth, aborter] = axiosRequest();
  reqAborters.current.push(aborter);
  return axiosRequestWithAuth.putHomeImage(params, blob, progressHandler);
}

function AddImageDialog() {
  const [filesToUpload, setFilesToUpload] = React.useState([]);
  const {
    images,
    dialogOpen, 
    setImagesState, 
    addImageState, 
    delImageState, 
    setImageDialogOpenState
  }  = useImageDialogState();

  const reqAborters = React.useRef([]);
  const inputRef = React.useRef(null);

  const handleDrop = React.useCallback((event) => {
    const {files} = event.dataTransfer || inputRef.current;
    const filesArray = toArray(files);
    console.log(files, filesArray);
    const now = Date.now();
    // setFilesToUpload(filesToUpload => [...filesToUpload, ...filesArray]);
    const imagesSupported = filesArray.filter(file => {
      return isValidImage(file.name);
    })
    if(imagesSupported.length !== filesArray.length){
      alert('Home image can be .jpg, .png or .gif only.')
    }
    imagesSupported.forEach((file, index) => {
      const id = now + index;
      const {name, size} = file;
      addImageState(
        {
          imageId: id, 
          imageName: name, 
          imageSize: size
        });
      setFilesToUpload(filesToUpload => {
        return [
          ...filesToUpload,
          {
            imageId: id, 
            blob: file,
            progress: '0%'
          }
        ]
      })
    })
  },[addImageState])

  const updateProgress = React.useCallback((imageId) => {
    const targetFile = filesToUpload.find(file => file.imageId === parseInt(imageId))
    return (progress) => {
      const newFile = {
        ...targetFile,
        progress
      }
      setFilesToUpload(filesToUpload => {
        const otherFiles = filesToUpload.filter(file => file.imageId !== parseInt(imageId));
        return [
          ...otherFiles,
          newFile
        ]
      })
    }
  }, [filesToUpload])
  console.log(filesToUpload)

  const handleClose = React.useCallback((event, reason) => {
    if(reason === 'backdropClick') return;
    reqAborters.current.forEach(aborter => aborter.cancel());
    setImageDialogOpenState(false);
    setFilesToUpload([]);
    setImagesState([]);
  },[setImageDialogOpenState, setImagesState]);

  const onClickFile = React.useCallback(() => {
    if(inputRef.current === null) return;
    inputRef.current.click();
  }, [])

  const delDropped = React.useCallback((e) => {
    const imageId = parseInt(e.target.id);
    delImageState(imageId)
    setFilesToUpload(filesToUpload => {
      const filtered = filesToUpload.filter(file => file.imageId !== imageId);
      return [
        ...filtered
      ]
    });
  }, [delImageState]);

  const saveImages = React.useCallback(() => {
    reqAborters.current = [];
    const saveRequests = filesToUpload
      .filter(file => file.progress !== '100%')
      .map((file, index) => {
        const {imageId, blob} = file;
        const {imageName, imageSize} = images.find(image => image.imageId === parseInt(imageId));
        return saveFile(imageId, imageName, imageSize, blob, reqAborters, updateProgress);
    })
    Promise.all(saveRequests)
    .then(results => {
      console.log(results)
    })
  }, [filesToUpload, images, updateProgress])

  const noFilesToUpload = filesToUpload.every(file => file.progress === '100%');

  return (
    <CustomDialog
      open={dialogOpen}
      TransitionComponent={Transition}
      onClose={handleClose}
      onDrop={handleDrop}
    >
      <DialogTitle>
        <TitleContainer>
          <div>
            Add Home Image
          </div>
          <Button size="small" variant="contained" sx={{marginLeft: 'auto'}} onClick={onClickFile}>Select Files</Button>
          <input ref={inputRef} type="file" multiple id="file" onChange={handleDrop} style={{display: 'none'}}></input>
        </TitleContainer>
      </DialogTitle>
      <DialogContent>
        <GridContainer>
          {images.map((image, index) => (
            <div key={image.imageId}>
              <ImageTitle>
                <div>{image.imageName} [{filesToUpload[index].progress}]</div>
                {filesToUpload[index].progress !== '100%' ? (

                  <DelButton
                    id={image.imageId}
                    onClick={delDropped}
                  >
                    Remove
                  </DelButton>
                ):(
                  <div>Done</div>
                )}
              </ImageTitle>
              <BlobImage blob={filesToUpload[index].blob} />
            </div>
          ))}
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'black' }} onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          disabled={images.length === 0 || noFilesToUpload} 
          sx={{ color: 'black' }} 
          // onClick={isEditMode ? handleChangeAsset : handleAddAsset}
          onClick={saveImages}
        >
          Upload
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}

export default React.memo(AddImageDialog);