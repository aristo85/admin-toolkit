/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import React, {
  FC,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import styles from './styles';
import {
  withStyles,
  AppBar,
  Toolbar,
  WithStyles,
  Tabs,
  Tab,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Account } from '../Account';
import classnames from 'classnames';
import { useLocation } from 'react-router';
import { useConfig } from '~/utils/hooks';

type IProps = WithStyles<typeof styles> & {};

const LinkTab = (props: any) => (
  <Tab
    component="a"
    onClick={(event: any) => {
      event.preventDefault();
    }}
    {...props}
  />
);

const HorizontalNavigationUnstyled: FC<IProps> = ({ classes }) => {
  const config = useConfig();

  const history = useHistory();
  const location = useLocation();
  const wrapper = useRef<HTMLDivElement>(null);
  const appbar = useRef<HTMLDivElement>(null);

  const links = useMemo(
    () =>
      config.pages
        .filter((page) => page?.menu?.url && page.canList)
        .map((page) => ({
          name: page.menu.label,
          url: page.menu.url,
        })),
    [config, config.pages, config.auth?.user?.role]
  );

  const role = useMemo(
    () =>
      (config.auth?.roleTitles &&
        config.auth?.user?.role &&
        config.auth?.roleTitles[config.auth?.user?.role]) ||
      config.auth?.user?.role,
    [config.auth?.roleTitles, config.auth?.user?.role]
  );

  const onTabChange = useCallback((_, tab) => history.push(links[tab].url), [
    history,
  ]);

  const activeTab = useMemo(() => {
    const active = links.findIndex((link) => {
      const re = new RegExp(`${link.url.replace(/\//gim, '\\/')}`);
      return location.pathname.match(re);
    });

    return active >= 0 ? active : 0;
  }, [location]);

  const account = useMemo(
    () => ({
      email: config.auth?.user?.email || '',
      username: config.auth?.user?.username || '',
      role,
    }),
    [config.auth, role]
  );

  useEffect(() => {
    if (!appbar.current || !wrapper.current) return;

    const height = appbar.current.getBoundingClientRect().height;

    if (!height) return;

    wrapper.current.style.height = `${height}px`;
  }, [appbar.current, wrapper.current]);

  return (
    <div ref={wrapper}>
      <AppBar className={classes.appbar} ref={appbar}>
        <Toolbar className={classes.toolbar}>
          {config.logo && (
            <Link to="/" className={classnames('logo', classes.title)}>
              <img
                src={config.logo}
                title={config.title}
                className={classes.logo}
                alt={config.title}
              />
            </Link>
          )}

          <Tabs
            onChange={onTabChange}
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            className={classes.tabs}
          >
            {links.map(({ name, url }) => (
              <Tab label={name} key={url} className={classes.tab} />
            ))}
          </Tabs>

          {!!config.auth && account && (
            <Account
              email={account.email}
              username={account.username}
              role={account.role}
              onLogout={config.auth?.logout}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const HorizontalNavigation = withStyles(styles, { withTheme: true })(
  HorizontalNavigationUnstyled
);

export { HorizontalNavigation };
