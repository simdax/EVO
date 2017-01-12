for i in *.png
do
    case $i in
        "requins.png")
            convert $i -scale 2% resize/$i
            ;;
        "rongeurs.png")
            convert $i -scale 8% resize/$i
            ;;
        "annelides.png")
            convert $i -scale 9% resize/$i
            ;;
        "grenouilles.png")
            convert $i -scale 5% resize/$i
            ;;
        "serpents.png")
            convert $i -scale 6% resize/$i
            ;;
        "seches.png")
            convert $i -scale 15% resize/$i
            ;;
        "orques.png")
            convert $i -scale 20% resize/$i
            ;;
        "coelacanthes.png")
            convert $i -scale 8% resize/$i
            ;;
        "thons.png")
            convert $i -scale 6% resize/$i
            ;;
        "arachnides.png")
            convert $i -scale 4% resize/$i
            ;;
        "crocodiles.png")
            convert $i -scale 3% resize/$i
            ;;
        "hippopotames.png")
            convert $i -scale 5% resize/$i
            ;;
        *)
            convert $i -scale 10% resize/$i
    esac
done         
