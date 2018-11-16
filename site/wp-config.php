<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'atc');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'Ch0c0l@teM1lk!');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '%kZdwrs0!_t-x< Z<VWK<{Z!Tl%suTuz&^Ar$^#MfNgc$ 8m-}nD78[+a!VodVV}');
define('SECURE_AUTH_KEY',  '8zyYX(N6&Oh0AOst~lpB/~[(ul Q]Jpu>bw1GM.xE3&TqLay>sa819Rizp9_P$6;');
define('LOGGED_IN_KEY',    '0nP41/l:].5e`U~%C?JPx*+jB?H#J]26&<u4<`i2i~K,t+%W9(@X>AlHhd{5<uqo');
define('NONCE_KEY',        'cH=J[i[]/&4C|GN)k>4)y.|tG@?Eg,~7C8Xf.Z%2Go}:60kum!>aBE/1}-Z~cXN-');
define('AUTH_SALT',        'W7>q,S~LZ/-YAD[%LZ&ps^k1~bcI#rr=DfE_aS(zeG#cZ~L6k?)_DcIeUJRwo=5C');
define('SECURE_AUTH_SALT', '_jsp[h$bx i;ZrK^r[5r?MfN!-`BY%qssLye )&:O{*k3`=sl2`Ru%c`.x7Dp$uY');
define('LOGGED_IN_SALT',   'm^IK0Ww..0Xp+K$&K+lgH=ravO{~godz(=bN>S1z6a/yQ>A<.6^r>.<I8cn&>~gy');
define('NONCE_SALT',       'K2FD<JjR?V|X-m+?Ge]Ad]},D@v7f(q6+8Ors#W)e[+P~&pTzw(e`PbTd-IKrLy&');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('FS_METHOD', 'direct');
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
