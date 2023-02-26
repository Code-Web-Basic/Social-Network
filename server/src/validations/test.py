import cv2
import numpy as np  
import matplotlib.pyplot as plt




img_bgr = cv2.imread('server/src/validations/peakpx.jpg')
img_bgr= cv2.cvtColor(img_bgr,cv2.COLOR_BGR2RGB)

img = np.array(img_bgr,'float')
maxV = 255/np.log(1+np.max(img_bgr))
vals = np.linspace(0,maxV,8,dtype=int)
plt.figure(figsize=(3,3),dpi=300)
subf=plt.subplot(3,3,1)
subf.imshow(img_bgr)
subf.set_title('anh goc'); subf.axis('off')


for i,c in enumerate(vals):
    log_image=c*(np.log(img+1))
    log_image=np.array(log_image,dtype='uint8')
    subf=plt.subplot(3,3,i+2)
    subf.imshow(log_image)
    subf.set_title('c='+str(c)); subf.axis('off')
plt.show()

# img= cv2.imread('server/src/validations/halo.png',0)

# plt.imshow(img,cmap='gray')
# plt.show()
# img_neg = 256-1-img


# plt.imshow(img_neg,cmap='gray')
# plt.show()


# img_bgr = cv2.imread('server/src/validations/halo.png',cv2.IMREAD_COLOR)

# img_neg = img_bgr

# height,width,_ = img_bgr.shape
# plt.imshow(cv2.cvtColor(img_bgr,cv2.COLOR_BGR2RGB))
# plt.show()
# for i in range(0,height-1):
#     for j  in range(0,width-1):
#         pixel = img_bgr[i,j]
#         pixel[0]=255-pixel[0]
#         pixel[1]=255-pixel[1]
#         pixel[2]=255-pixel[2]
#         img_neg[i,j]=pixel


# plt.imshow(cv2.cvtColor(img_neg,cv2.COLOR_BGR2RGB))
# plt.show()