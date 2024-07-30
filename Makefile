# Makefile
OUTDIR = pdfs
TEXFILE = templates/temp1.tex
PDFNAME = ahmed-barhoumi-resume-$(shell date +%Y-%m-%d-%Hh%Mm).pdf

# Default target
all: 
	mkdir -p $(OUTDIR)
	pdflatex -output-directory=$(OUTDIR) $(TEXFILE)
	mv $(OUTDIR)/$(basename $(notdir $(TEXFILE))).pdf $(OUTDIR)/$(PDFNAME)

# Clean up auxiliary files
clean:
	rm -f $(OUTDIR)/*.log $(OUTDIR)/*.aux $(OUTDIR)/*.out
