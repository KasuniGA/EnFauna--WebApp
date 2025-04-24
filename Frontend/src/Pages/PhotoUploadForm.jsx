import React, { useState } from "react";
import { Upload, X, Check, Camera } from "lucide-react";
import { usePhotoStore } from "../store/photo.store.js";
import { useNavigate } from "react-router-dom";
import Toast from "../Components/Toast.jsx";

const PhotoUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    species: "",
    location: "",
    imageUrl: "", // Added to store Cloudinary URL
  });

  // Sri Lanka wildlife background images grid
  const backgroundTiles = [
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LWhrZzEtMi5jZG5pbnN0YWdyYW0uY29tL3YvdDM5LjMwODA4LTYvNDUzNjI4NjA5XzE4NDQ3NTk5MDI5MDQzNzc2XzQwODA4OTA0NjQwMjEwMjQ1OTBfbi5qcGc_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1Zek1EZ3dPQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtaGtnMS0yLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDQmX25jX29jPVE2Y1oyUUhuYWhRVTk5RlF3bFFVd2RzaDgyOWtCM0F0WTRiMGdiOEpWRm4zalJ1Sk1CT0JRcTc4ejA2M0ozY0hZTk93d1BBJl9uY19vaGM9WHJIRkZOWjdndVVRN2tOdndGczhPSFUmX25jX2dpZD1LVVRfX2hIcG03QkpjVEI5b2hYak9nJmVkbT1BUHMxN0NVQUFBQUEmY2NiPTctNSZvaD0wMF9BZkdsQ2xrQm9qeHo3cHBSRVpPMmhkMGg3VEdmUXJsQTV1aVBxcVQtRlRzbUZRJm9lPTY3RjkxQzM0Jl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzQ1MzYyODYwOV8xODQ0NzU5OTAyOTA0Mzc3Nl80MDgwODkwNDY0MDIxMDI0NTkwX24uanBnIn0.YnNhm1QVynBjGTR7JGoYAUjDNeqXOEGtOBHuG7FhXB4",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LWNkZzQtMy5jZG5pbnN0YWdyYW0uY29tL3YvdDUxLjI5MzUwLTE1LzQyODE5NTE3OV8zNTM3NTU0MjA5MDY3NTFfNTA3ODAzNzQyMzQ3OTYyMDU1Nl9uLmhlaWM_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1ZeU9UTTFNQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtY2RnNC0zLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMTEmX25jX29jPVE2Y1oyUUcyYWFHWTVhajBjVkFLaXJCX0diQ2I1LVFvRS12ZWRjcDNHUmVhTXNSN1JwWmNyX21oY0RMejljZm4zVEVCcUQwJl9uY19vaGM9TExIbGtjY3JTeE1RN2tOdndFRE1TNVUmX25jX2dpZD1SR0hwdkRPcmpOTGdtZjdTUDRCQklnJmVkbT1BUHMxN0NVQkFBQUEmY2NiPTctNSZvaD0wMF9BZkZZQmxxOTh4SkE4YjhBS0FmNm0tZDY4Z2tvbGEwOEJKXzh2bVE0NXpmTzZnJm9lPTY3RjkxQ0ZEJl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzQyODE5NTE3OV8zNTM3NTU0MjA5MDY3NTFfNTA3ODAzNzQyMzQ3OTYyMDU1Nl9uLmpwZyJ9.LFBeYcfmL-IyGmIlC7HPuiD32sm9x-_B9DSaTYfW_qI",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LWFtczItMS5jZG5pbnN0YWdyYW0uY29tL3YvdDUxLjI5MzUwLTE1LzI4NzcwNjU1M18xMjU2Njk1MzAxNTAxNTJfMzQ3NDAyMDU0MTk3NDc3NTUyNF9uLndlYnA_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1ZeU9UTTFNQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtYW1zMi0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDAmX25jX29jPVE2Y1oyUUdLMUNQR3FxU1pIMm5iU3BHR3R1VXZlNmIyNVFySFQ1ajFYejBsaE9sWXdXQWVWakEwY25vSlFzV0V2NFoya2dzJl9uY19vaGM9dk5WaXpPY3hXbklRN2tOdndISlNXSGwmX25jX2dpZD05T2ExOUtnZTQ0c3JGWFdrNnRHc3NRJmVkbT1BUHMxN0NVQkFBQUEmY2NiPTctNSZvaD0wMF9BZkhKUHVYMkZnSU9lN2d1LVIxY1llRy1vQ3ZiM3RSVk82cVFZbUJJNURtOHBnJm9lPTY3RjkzNjEwJl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzI4NzcwNjU1M18xMjU2Njk1MzAxNTAxNTJfMzQ3NDAyMDU0MTk3NDc3NTUyNF9uLndlYnAifQ.cKEr3ZzUtG0oxtWI8YSsMTUYQGJpHxy0FNbGJfpzaGU",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LWxocjgtMS5jZG5pbnN0YWdyYW0uY29tL3YvdDUxLjI5MzUwLTE1LzQxMDgzMDUyN184OTM3MDQ5MzIxNzAxNTZfODEzMDU5MjUwMDU2Njk4OTgyNF9uLmhlaWM_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1ZeU9UTTFNQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtbGhyOC0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDgmX25jX29jPVE2Y1oyUUZNQ0ZxYzdmZTZmWmpGQmRjRHVBOGNObU5IQUNtYzFjQ0c5eUczRTZOYldieUtEQ25yU2Jya2ZBSjk3Z1BNSUFjJl9uY19vaGM9NTR6LTdVbUN4RTBRN2tOdndFYnpIRDYmX25jX2dpZD1rS3pTOXBXZk1hZjdxY0pZVy1oVUNnJmVkbT1BUHMxN0NVQkFBQUEmY2NiPTctNSZvaD0wMF9BZkhFd2ZFNkRWclhMWlVXV1JKUGp2WHo1d2hmN1lnal92UkkxNS1yTF9wT3NBJm9lPTY3RjkzRTI4Jl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzQxMDgzMDUyN184OTM3MDQ5MzIxNzAxNTZfODEzMDU5MjUwMDU2Njk4OTgyNF9uLmpwZyJ9.LZt2ByR5TDeswTRX30oBcj9sQM2u-Ks2Vxv_kWcyCHk",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LWhrZzEtMi5jZG5pbnN0YWdyYW0uY29tL3YvdDM5LjMwODA4LTYvNDUzNzUyMjIyXzE4NDQ3NTk5MTA3MDQzNzc2Xzg0MDczNjUwNzY0NzY3NzY1MzJfbi5qcGc_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFM09UWXVjMlJ5TG1Zek1EZ3dPQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtaGtnMS0yLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDQmX25jX29jPVE2Y1oyUUhuYWhRVTk5RlF3bFFVd2RzaDgyOWtCM0F0WTRiMGdiOEpWRm4zalJ1Sk1CT0JRcTc4ejA2M0ozY0hZTk93d1BBJl9uY19vaGM9UjRWeDRsOERDa2NRN2tOdndHNUU5dWgmX25jX2dpZD1LVVRfX2hIcG03QkpjVEI5b2hYak9nJmVkbT1BUHMxN0NVQUFBQUEmY2NiPTctNSZvaD0wMF9BZkZyeVh4YWMxWVFnMVF2bmRtb2NmbXAtbExNanFGVzNiY1NTMnRIYUlMRjBBJm9lPTY3RjkxRUVEJl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzQ1Mzc1MjIyMl8xODQ0NzU5OTEwNzA0Mzc3Nl84NDA3MzY1MDc2NDc2Nzc2NTMyX24uanBnIn0.jVXKmMuQaZuKaPvY2SMYiKi9DrlOrOolHkYWGyIWJww",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LW14cDItMS5jZG5pbnN0YWdyYW0uY29tL3YvdDUxLjI4ODUtMTUvNDg1NjE4NzI3XzE4NDkyMzgyMDc1MDQzNzc2Xzc0MTA3NjgxNzI2NTM2MzM1NTJfbi5qcGc_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1ZM05UYzJNUzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtbXhwMi0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDQmX25jX29jPVE2Y1oyUUd6WVBMN19FdlJQaFc0cEppb1doa2wwZ3dsdmNQRk41UTlDN2R0VTR1SGpnTEwySGdISFYwWWxianN3V183dHFFJl9uY19vaGM9X25XMldlR3YyMDhRN2tOdndGMVdnZnQmX25jX2dpZD1OdzNQUEY4a0ZQaWZuazhINFpqaFVRJmVkbT1BUHMxN0NVQkFBQUEmY2NiPTctNSZvaD0wMF9BZkVTbE9OclQtMWtnMXBGcjJJN19tR2NQZ3lkUjRoU0lHd3czN1AtNnFYWjhBJm9lPTY3RjkzMEMzJl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzQ4NTYxODcyN18xODQ5MjM4MjA3NTA0Mzc3Nl83NDEwNzY4MTcyNjUzNjMzNTUyX24uanBnIn0.NWw46iK3q4Ee8mTsXg08c06i1Qs2jEE7f5cb6NBjEes",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LXN5ZDItMS5jZG5pbnN0YWdyYW0uY29tL3YvdDUxLjI4ODUtMTUvNDgyMDAwODEyXzE4NDg3NzM4NjI0MDQzNzc2XzM3MzA1MTI2NTAyMTM0OTQ0OTVfbi5qcGc_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1ZM05UYzJNUzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtc3lkMi0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDQmX25jX29jPVE2Y1oyUUZ0ZGpVdDI1ZmYybDVUN1B2YkxEaGxlU3lIWERpUS05bEg4ckdUSDhQSHh2eXZvS1dmVjE0RkJhREJEamFZZUlBJl9uY19vaGM9RTBCcThZaVZOZ1FRN2tOdndIaVRnUGMmX25jX2dpZD11NVhMNGZGM1h4V3dNMFEwdVBzeVN3JmVkbT1BUHMxN0NVQkFBQUEmY2NiPTctNSZvaD0wMF9BZkUyQkxURVNLdl9OMklzWU1DazVJR0Jqb2ZaWEFDMXVCYmJwSEJYanR2Y0l3Jm9lPTY3RjkxREJBJl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzQ4MjAwMDgxMl8xODQ4NzczODYyNDA0Mzc3Nl8zNzMwNTEyNjUwMjEzNDk0NDk1X24uanBnIn0.L4ZPe2GaAbriJjUtpeUCdFD8go4lsYj_LYqg7Yt_fYE",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LWJlcjEtMS5jZG5pbnN0YWdyYW0uY29tL3YvdDUxLjI4ODUtMTUvNDcxNTk5Nzc2XzE4NDc1ODI3NzY5MDQzNzc2XzE3NDg0NTQyOTI4MzM4NDI1MDNfbi5qcGc_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1ZM05UYzJNUzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtYmVyMS0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDQmX25jX29jPVE2Y1oyUUZjLWxCR2FuWVJrMlh5WU5nUG80b3FJa0tEVDBFSFFRQkJpVkYtT2JBZWsycG91bWpmSFNMVlBhUml6UTMtR0tBJl9uY19vaGM9QUxhY0lUM0JkRWNRN2tOdndGdU5namcmX25jX2dpZD1KYkRrVkd1R3FUSnJ1TjE3Q0hrR3Z3JmVkbT1BUHMxN0NVQkFBQUEmY2NiPTctNSZvaD0wMF9BZkU1Yy1DOERoT1plSGZLWVRnZXp1dko1eV93U3RKRnNKX2thS0VGTjNvQ0RBJm9lPTY3RjkzMERGJl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzQ3MTU5OTc3Nl8xODQ3NTgyNzc2OTA0Mzc3Nl8xNzQ4NDU0MjkyODMzODQyNTAzX24uanBnIn0.AQ2qn9RQ301bZCy01Gl4dUJFWtyrcN2KH2JB7rFEK2E",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LWFybjItMS5jZG5pbnN0YWdyYW0uY29tL3YvdDM5LjMwODA4LTYvNDM4MDk5MDk0XzE4NDI3OTU3Njk5MDQzNzc2XzI0MTE3MDkzNDUyMDM1MzY1NTVfbi5qcGc_c3RwPWRzdC1qcGdfZTM1X3A2NDB4NjQwX3NoMC4wOF90dDYmZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW1sdFlXZGxYM1Z5YkdkbGJpNHhORFF3ZURFNE1EQXVjMlJ5TG1Zek1EZ3dPQzVrWldaaGRXeDBYMmx0WVdkbEluMCZfbmNfaHQ9c2NvbnRlbnQtYXJuMi0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDQmX25jX29jPVE2Y1oyUUZXdUpPN3h4V0NhMktGRHd4QkduV3NkamZMTmFDQ0JSVy1ScTF2bjFxWG5ORVlHSWVZN08yaUNmbUhTQkJnV0JjJl9uY19vaGM9Y2JTRWNJM0VpWllRN2tOdndGUTY4ODgmX25jX2dpZD1ZSENPalk2amNpS2xxeDFFV1BJT3l3JmVkbT1BUHMxN0NVQUFBQUEmY2NiPTctNSZvaD0wMF9BZkc3OEdsZnRIOUpGYktuTTB4eENwQWdxUHNsVEZwTFV2dE0wM1VudElUVll3Jm9lPTY3RjkzRjI0Jl9uY19zaWQ9MTBkMTNiIiwiZmlsZW5hbWUiOiJTbmFwaW5zLmFpX3RodW1iXzQzODA5OTA5NF8xODQyNzk1NzY5OTA0Mzc3Nl8yNDExNzA5MzQ1MjAzNTM2NTU1X24uanBnIn0.4lF1pHrvmhSP5MoYzSbop2GMvDPg55MDHplAKTg5ujU",
    "https://d.rapidcdn.app/snapinst?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTEuMjg4NS0xNS80NzY1NzAwMjZfMTg0ODQzNjQ5MzUwNDM3NzZfNTM2MjYzNjg4NTI2NDg3MzY3NF9uLmpwZz9zdHA9ZHN0LWpwZ19lMzVfcDY0MHg2NDBfc2gwLjA4X3R0NiZlZmc9ZXlKMlpXNWpiMlJsWDNSaFp5STZJbWx0WVdkbFgzVnliR2RsYmk0eE5EUXdlREU0TURBdWMyUnlMbVkzTlRjMk1TNWtaV1poZFd4MFgybHRZV2RsSW4wJl9uY19odD1zY29udGVudC5jZG5pbnN0YWdyYW0uY29tJl9uY19jYXQ9MTA0Jl9uY19vYz1RNmNaMlFHcG1HLUZLMDlHRzV6Rm83MUpzZWFBY2gzaXBLeXhicXNCZ19MYWppU19lZlNsLUszM1FYMlNZVHE5enVkS0tnMCZfbmNfb2hjPXVrZDFhX0x0d21JUTdrTnZ3SHlzWWJYJl9uY19naWQ9dGFQd05EdXNOVnpPUDR4V0JmbnB4QSZlZG09QVBzMTdDVUJBQUFBJmNjYj03LTUmb2g9MDBfQWZIS2JHVW9OZm01UTlNUHVVbWstQmhPejRzcnRHanltTjhGS3BuV3Zra1RmdyZvZT02N0Y5MjZENSZfbmNfc2lkPTEwZDEzYiIsImZpbGVuYW1lIjoiU25hcGlucy5haV90aHVtYl80NzY1NzAwMjZfMTg0ODQzNjQ5MzUwNDM3NzZfNTM2MjYzNjg4NTI2NDg3MzY3NF9uLmpwZyJ9.Lsj_SM9q6TpzO7Fye7SrTT4WwwL7Op1okckZ8ji1vQg",
  ];

  const { uploadPhoto } = usePhotoStore();
  const navigate = useNavigate();

  const showToastMessage = (title, description) => {
    setToastMessage({ title, description });
    setShowToast(true);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      showToastMessage(
        "Invalid File",
        "Please upload an image file (JPG, PNG)"
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToastMessage("File Too Large", "File size must be less than 10MB");
      return;
    }

    // Set preview
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    const uploadPreset = "test_image"; // Using Cloudinary's default preset
    const cloudinaryURL = `https://api.cloudinary.com/v1_1/dqyone0du/image/upload`;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    // Adding timestamp for better tracking
    data.append("timestamp", Math.floor(Date.now() / 1000));

    try {
      console.log("Starting Cloudinary upload...");
      const res = await fetch(cloudinaryURL, {
        method: "POST",
        body: data,
      });

      console.log("Cloudinary response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Cloudinary error response:", errorText);
        throw new Error(
          `Upload failed with status: ${res.status}. Details: ${errorText}`
        );
      }

      const result = await res.json();
      console.log("Cloudinary upload success, received data:", result);
      if (result.secure_url) {
        setFormData((prev) => ({ ...prev, imageUrl: result.secure_url }));
        showToastMessage(
          "Upload Successful",
          "Image uploaded to cloud storage"
        );
      } else {
        throw new Error("Upload failed: No secure URL returned");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showToastMessage("Upload Error", "Failed to upload image to Cloudinary");
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      showToastMessage("Missing Photo", "Please select an image to upload");
      return;
    }

    if (
      !formData.name ||
      !formData.title ||
      !formData.species ||
      !formData.location
    ) {
      showToastMessage("Missing Fields", "Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await uploadPhoto({
        name: formData.name,
        title: formData.title,
        description: formData.description,
        species: formData.species,
        location: formData.location,
        imageUrl: formData.imageUrl, // Using the Cloudinary URL
      });

      if (result.success) {
        showToastMessage("Success", "Photo uploaded successfully!");

        // Reset form
        setSelectedFile(null);
        setPreview(null);
        setFormData({
          name: "",
          title: "",
          description: "",
          species: "",
          location: "",
          imageUrl: "",
        });

        // Navigate after delay
        setTimeout(() => navigate("/gallery"), 2000);
      } else {
        showToastMessage("Error", result.message || "Failed to upload photo");
      }
    } catch (error) {
      showToastMessage("Error", "Failed to upload photo");
      console.error("Upload error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 z-10"></div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 w-full h-full transform scale-105">
          {/* Background tiles with images */}
          {backgroundTiles.map((image, index) => (
            <div key={index} className="relative overflow-hidden">
              <img
                src={image}
                alt={`Wildlife ${index + 1}`}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition duration-500 hover:scale-105 transform"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="relative z-20 my-20 max-w-2xl mx-auto p-8 bg-white bg-opacity-90 dark:bg-slate-800 dark:bg-opacity-90 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center gap-3 mb-8 transform transition-transform hover:translate-x-2">
          <Camera className="w-7 h-7 text-emerald-600 dark:text-emerald-300" />
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-200">
            Upload Wildlife Photo
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div className="relative transition-all duration-300 transform hover:scale-[1.01]">
            {!preview ? (
              <div className="border-3 border-dashed border-emerald-300 dark:border-emerald-600 rounded-lg p-10 text-center hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors bg-white bg-opacity-50 dark:bg-slate-700 dark:bg-opacity-40">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-16 h-16 mx-auto mb-4 text-emerald-500 dark:text-emerald-300 animate-bounce-slow" />
                <p className="text-emerald-700 dark:text-emerald-200 font-medium">
                  Drag and drop your photo here or click to browse
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-300 mt-2 opacity-80">
                  Maximum file size: 10MB (JPG, PNG)
                </p>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-72 object-cover rounded-lg transition-all duration-500 hover:transform hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                    setFormData((prev) => ({ ...prev, imageUrl: "" }));
                  }}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-slate-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-emerald-700 dark:text-emerald-200" />
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid gap-6 bg-white bg-opacity-70 dark:bg-slate-700 dark:bg-opacity-50 p-6 rounded-xl shadow-md">
            <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
              <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-200 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 border rounded-lg bg-emerald-50 dark:bg-slate-600 text-emerald-800 dark:text-emerald-50 border-emerald-200 dark:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-emerald-400 dark:placeholder-emerald-300 transition-all duration-200"
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
              <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-200 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Give your photo a title"
                required
                className="w-full px-4 py-3 border rounded-lg bg-emerald-50 dark:bg-slate-600 text-emerald-800 dark:text-emerald-50 border-emerald-200 dark:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-emerald-400 dark:placeholder-emerald-300 transition-all duration-200"
              />
            </div>

            <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
              <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-200 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Tell us about your photo"
                rows="3"
                className="w-full px-4 py-3 border rounded-lg bg-emerald-50 dark:bg-slate-600 text-emerald-800 dark:text-emerald-50 border-emerald-200 dark:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-emerald-400 dark:placeholder-emerald-300 transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 transform transition-all duration-300 hover:translate-y-[-2px]">
                <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-200">
                  Species <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.species}
                  onChange={(e) =>
                    setFormData({ ...formData, species: e.target.value })
                  }
                  placeholder="Enter species name"
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-emerald-50 dark:bg-slate-600 text-emerald-800 dark:text-emerald-50 border-emerald-200 dark:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-emerald-400 dark:placeholder-emerald-300 transition-all duration-200"
                />
              </div>

              <div className="space-y-2 transform transition-all duration-300 hover:translate-y-[-2px]">
                <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-200">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter location name"
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-emerald-50 dark:bg-slate-600 text-emerald-800 dark:text-emerald-50 border-emerald-200 dark:border-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-emerald-400 dark:placeholder-emerald-300 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          <Toast
            isVisible={showToast}
            message={toastMessage.title}
            description={toastMessage.description}
            onClose={() => setShowToast(false)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.imageUrl}
            className={`w-full py-4 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-3 transform transition-all duration-300 hover:scale-[1.02] shadow-lg
              ${
                isSubmitting || !formData.imageUrl
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed shadow-sm"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-500 dark:to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200 dark:shadow-emerald-800"
              }`}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
            ) : (
              <>
                <Upload className="w-5 h-5 animate-bounce-slow" />
                Upload Photo
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoUploadForm;