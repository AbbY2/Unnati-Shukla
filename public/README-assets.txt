DOCTOR PORTRAIT — already wired up.

Just save the photo here as:  doctor.jpg  (portrait, ~4:5 ratio, face toward the top)

The Doctor section (src/sections/Doctor.tsx) automatically loads /doctor.jpg and
crops it with object-cover / object-top. If the file is missing it gracefully
shows a placeholder instead, so nothing breaks. No code change needed — drop the
file in and refresh.

Optional social share image: og-image.jpg (1200x630) can also go here.
