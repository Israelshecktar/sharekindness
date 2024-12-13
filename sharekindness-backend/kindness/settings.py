import os
import json
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Path to the configuration file
config_path = os.path.join(BASE_DIR, 'config.json')

# Load the configuration
try:
    with open(config_path) as config_file:
        config = json.load(config_file)
except FileNotFoundError:
    raise Exception("Configuration file 'config.json' not found.")

"""
Django settings for kindness project.

Generated by 'django-admin startproject' using Django 4.2.17.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

# --- Basic Settings ---
SECRET_KEY = config.get('SECRET_KEY', 'django-insecure-fallback-key')
DEBUG = config.get('DEBUG', True)
ALLOWED_HOSTS = config.get('ALLOWED_HOSTS', [])

# --- Application definition ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',  # Enable CORS
    'kindness',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Enable CORS
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'kindness.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'kindness.wsgi.application'

# --- Database Configuration (Loaded from config.json) ---
DATABASES = {
    'default': {
        'ENGINE': config['DATABASE']['ENGINE'],
        'NAME': config['DATABASE']['NAME'],
        'USER': config['DATABASE']['USER'],
        'PASSWORD': config['DATABASE']['PASSWORD'],
        'HOST': config['DATABASE']['HOST'],
        'PORT': config['DATABASE']['PORT'],
    }
}

# --- Password validation ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

AUTH_USER_MODEL = 'kindness.User'

# --- Internationalization ---
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --- Static Files (CSS, JavaScript, Images) ---
STATIC_URL = 'static/'

# --- Default primary key field type ---
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- JWT Authentication ---
from datetime import timedelta

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=config.get('ACCESS_TOKEN_LIFETIME', 60)),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=config.get('REFRESH_TOKEN_LIFETIME', 7)),
    'ROTATE_REFRESH_TOKENS': config.get('ROTATE_REFRESH_TOKENS', True),
    'BLACKLIST_AFTER_ROTATION': config.get('BLACKLIST_AFTER_ROTATION', True),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# --- CORS Configuration ---
CORS_ALLOW_ALL_ORIGINS = True  # Allow all origins for development purposes

# Alternatively, specify allowed origins
CORS_ALLOWED_ORIGINS = [
   "http://localhost:3000",
   "http://127.0.0.1:3000",
   "https://your-frontend-domain.com",
 ]

CORS_ALLOW_CREDENTIALS = config.get('CORS_ALLOW_CREDENTIALS', True)

# --- Logging Configuration ---
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',  # Use Python's str.format() style
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',  # Use Python's str.format() style
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'debug.log'),
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
