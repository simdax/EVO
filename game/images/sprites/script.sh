for i in *.png
do
    case $i in
      "ipad.png")
      convert $i -scale 280% resize/$i
      ;;
      "reglesMANGER.png")
      convert $i -scale 80% resize/$i
      ;;
      "reglesEVO.png")
      convert $i -scale 80% resize/$i
      ;;
      "ICONEARBREEVOLUTION.png")
                    convert $i -scale 5% resize/$i
            ;;
      "ICONEmanger.png")
                    convert $i -scale 30% resize/$i
            ;;
      "vaisseau.png")
            convert $i -scale 6.5% resize/$i
            ;;
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
            convert $i -scale 5% resize/$i
            ;;
        "seches.png")
            convert $i -scale 20% resize/$i
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
            convert $i -scale 2.5% resize/$i
            ;;
        "crocodiles.png")
            convert $i -scale 2.5% resize/$i
            ;;
        "hippopotames.png")
            convert $i -scale 5% resize/$i
            ;;
	"gorilles.png")
            convert $i -scale 15% resize/$i
            ;;
        *)
            convert $i -scale 10% resize/$i
    esac
done
