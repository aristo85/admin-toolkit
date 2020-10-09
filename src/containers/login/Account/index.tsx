/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, { FC, useCallback, useMemo, useRef } from 'react';
import styles from './styles.module.scss';
import { useConfig } from '~/utils/hooks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Account: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const config = useConfig();
  const onLogout = useCallback(() => {
    if (!window.confirm('Вы действительно хотите выйте?')) return;
    config.auth?.logout();
  }, [config.auth]);

  return (
    <div className={styles.account} ref={ref}>
      <div className={styles.left}>
        <div className={styles.name}>{config.auth?.userName}</div>
        <div className={styles.role}>{config.auth?.userRoleTitle}</div>
      </div>
      <div className={styles.logout} onClick={onLogout}>
        <ExitToAppIcon />
      </div>
    </div>
  );
};

export { Account };
