/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { Theme } from '@material-ui/core';

export default (theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap' as 'wrap',
    flexDirection: 'row-reverse' as 'row-reverse',
    paddingLeft: 10,
    margin: '0 !important',

    '& .MuiInputLabel-outlined': {
      whiteSpace: 'nowrap',
    },

    '& > *': {
      marginRight: 10,
      marginTop: 5,
      marginBottom: 5,
    },
  },
  formControl: {
    margin: `0 ${theme.spacing(1)}px 0 0`,
    minWidth: 120,
  },
  select: {
    '& > div': {
      padding: '10px 14px 7px',
    },
  },
  input: {
    display: 'flex',
    boxShadow: 'inset rgba(0, 0, 0, 1) 0 0 1px',
    borderRadius: '0 4px 4px 0',
    backgroundColor: 'white',

    '& .select': {
      padding: '10px 34px 7px 14px',
    },
    '& input': {
      padding: '10px 14px 7px',
    },
    '& label': {
      transform: 'translate(10px, 12px) scale(0.9)',
    },
  },
  clear: {
    height: 36,
    width: 36,
    padding: 0,
  },
  label: {
    transform: 'translate(10px, 12px) scale(0.9)',
  },
  iconButton: {
    height: 36,
    width: 36,
    padding: 0,
  },
  filterButton: {
    padding: 0,
    minWidth: 36,
    height: 36,

    '& span': {
      width: 'auto',
    },
  },
});
