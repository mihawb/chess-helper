import re
#from tensorflow.keras.applications.vgg16 import VGG16
from field_crop.cv_chess_functions import (read_img,
                               x_crop_images)

# Resize the frame by scale by dimensions
# def rescale_frame(frame, percent=75):
#     # width = int(frame.shape[1] * (percent / 100))
#     # height = int(frame.shape[0] * (percent / 100))
#     dim = (1000, 750)
#     return cv2.resize(frame, dim, interpolation=cv2.INTER_AREA)


# Find the number(s) in the text
#def natural_keys(text):
#    return [atoi(c) for c in re.split('(\d+)', text)]


#model_path='model_weights/vgg16_weights_tf_dim_ordering_tf_kernels_notop.h5'
#
## Load in the CNN model
#model = VGG16(include_top=False ,weights=model_path)
#
## Select the live video stream source (0-webcam & 1-GoPro)
##cap = cv2.VideoCapture(1)
#
## Show the starting board either as blank or with the initial setup
## start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
#blank = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
##board = fen_to_image(blank)
#board_image = cv2.imread('chessboard.png')
#cv2.imshow('current board', board_image)

# while(input):
# Capture frame-by-frame
#ret, frame = cap.read()

# Resizes each frame
#small_frame = rescale_frame(board_image)

# Display the resulting frame
#cv2.imshow('live', small_frame)

#if True:#cv2.waitKey(1) & 0xFF == ord(' '):

    #print('Working...')
    # Save the frame to be analyzed
# cv2.imwrite('chessboard.jpeg', board_image)
    # Low-level CV techniques (grayscale & blur)

def crop_fields(image_to_proceed):

    img, gray_blur = read_img(image_to_proceed)
        # Canny algorithm

  #  try:
  #      edges = canny_edge(gray_blur)
  #          # Hough Transform
  #      lines = hough_line(edges)
  #          # Separate the lines into vertical and horizontal lines
  #      h_lines, v_lines = h_v_lines(lines)
  #          # Find and cluster the intersecting
  #      intersection_points = line_intersections(h_lines, v_lines)
  #  except:
  #      print("ehxd")
#
#
  #  try:
  #      points = cluster_points(intersection_points)
  #  except:
  #      points=[]
  #      print("cluster points error")
#
  #      # Final coordinates of the board
#
  #  try:
  #      points = augment_points(points)
  #  except:
  #      points=[]
  #      print("augment points error")


    # print("POINTS: ",points)

    # print("POINTS LEN ", len(points))
    # print("POINTS SHAPE ", np.shape(points))

        # Crop the squares of the board a organize into a sorted list
    #x_list = write_crop_images(img, points, 0)
    x_list = x_crop_images(img, points=[])

    #zz = write_crop_images(img,points)

    # img_filename_list = grab_cell_files()
    # img_filename_list.sort(key=natural_keys)
    #     # Classify each square and output the board in Forsyth-Edwards Notation (FEN)
    # fen = classify_cells(model, img_filename_list)
    # #fen='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
    # # Create and save the board image from the FEN

    # print("FEN:",fen)

    # #board = fen_to_image(fen)
    # # Display the board in ASCII
    # #print(board)
    # # Display and save the board image
    # board_image = cv2.imread('current_board.png')
    # #cv2.imshow('current board', board_image)
    # print('Completed!')

    #if cv2.waitKey(1) & 0xFF == ord('q'):
        # End the program
        #break

    # When everything is done, release the capture
    #cap.release()
    #cv2.destroyAllWindows()
