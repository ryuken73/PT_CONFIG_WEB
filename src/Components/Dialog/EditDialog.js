import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import OptionItemText from 'Components/Dialog/OptionItemText';
import OptionItemRadio from 'Components/Dialog/OptionItemRadio';
import useConfigState from 'hooks/useConfigState';
import useMonitorListState from 'hooks/useMonitorListState';
import CONSTANTS from 'config/constants';

const toLabelValueFormat = type => {
  return Object.keys(CONSTANTS[type]).map(key => {
    return { label: key, value: CONSTANTS[type][key] }
  })
}
const mediaTypeFormItems = toLabelValueFormat('MEDIA_TYPE');
const urlTypeFormItems = toLabelValueFormat('URL_TYPE');
const streamTypeFormItems = toLabelValueFormat('STREAM_TYPE');

const CustomDialog = styled(Dialog)`
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: #9f7f7f;
      width: 800px;
      max-width: 800px;
    }
  }
`
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DEFAULT_RADIO_VALUE = {
  title: '',
  url: '',
  urlType: CONSTANTS.URL_TYPE.API,
  mediaType: CONSTANTS.MEDIA_TYPE.AUDIO,
  streamType: CONSTANTS.STREAM_TYPE.HLS,
}

const EditDialog = props => {
  const {
    urlsToMonitor,
    isEditDialogOpen:open, 
    setEditDialogStateOpen:setOpen, 
    currentEditItemId,
    setMonitorUrlsInConfig 
  } = useConfigState();
  const {monitorItems, setMonitorItemProp} = useMonitorListState();
  const currentEditItemIndex = monitorItems.findIndex(monitor => monitor.itemId === currentEditItemId);
  const currentEditItem = monitorItems.find(monitor => monitor.itemId === currentEditItemId) || DEFAULT_RADIO_VALUE;
  const {itemId, title, url, urlType, mediaType, streamType} = currentEditItem;
  const options = React.useMemo(() => {
    return {
      itemId,
      title,
      url,
      urlType,
      mediaType,
      streamType,
    }
  },[itemId, title, url, urlType, mediaType, streamType])
  console.log('^^^^^', options)

  const handleClose = React.useCallback((event, reason) => {
    if(reason === 'backdropClick') return;
    setOpen(currentEditItemId, false);
  },[setOpen, currentEditItemId]);

  const SaveItem = React.useCallback((event, reason) => {
    const index = urlsToMonitor.findIndex(url => url.itemId === itemId);
    setMonitorUrlsInConfig([...urlsToMonitor.slice(0,index), options, ...urlsToMonitor.slice(index+1)])
    handleClose(event, reason)
  },[options, urlsToMonitor, setMonitorUrlsInConfig, itemId, handleClose]);

  // const handleAddNewUrl = React.useCallback(() => {
  //   console.log(options);
  //   const now = Date.now();
  //   options.itemId = now.toString();
  //   replaceMonitorItemInList(options, currentEditItemId, currentEditItemIndex )
  //   handleClose();
  // },[options, currentEditItemId, currentEditItemIndex, replaceMonitorItemInList, handleClose])

  const onChangeOption = React.useCallback((event, idOfRadiioButton) => {
      const optionName = event.target.id !== '' ? event.target.id : idOfRadiioButton;
      const optionValue = event.target.value;
      console.log(optionName, optionValue)
      setMonitorItemProp(currentEditItemId, optionName, optionValue);
  },[currentEditItemId, setMonitorItemProp])

  const radioButtons = [
    {title: 'URL TYPE', id: 'urlType', formItems: urlTypeFormItems},
    {title: 'MEDIA TYPE', id: 'mediaType', formItems: mediaTypeFormItems},
    {title: 'STREAM TYPE', id: 'streamType', formItems: streamTypeFormItems}
  ]

  return (
    <div>
      <CustomDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Modify Config"}</DialogTitle>
        <DialogContent>
          <OptionItemText autoFocus onChange={onChangeOption} value={options.title} title="Title" id="title"></OptionItemText>
          <OptionItemText onChange={onChangeOption} value={options.url} title="URL" id="url"></OptionItemText>
          {radioButtons.map(radioButton => (
            <OptionItemRadio 
              onChange={onChangeOption} 
              title={radioButton.title}
              id={radioButton.id}
              selected={options[radioButton.id]}
              formItems={radioButton.formItems}
            ></OptionItemRadio>
          ))}
        </DialogContent>
        <DialogActions>
          <Button sx={{color: 'black'}} onClick={SaveItem}>Save</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(EditDialog)