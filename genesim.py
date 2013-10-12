def subpheno(a, b):
    if a == b:
        return a
    elif a.isupper() and b.isupper():
        return ''.join(sorted(a+b))
    elif a.isupper():
        return a
    elif b.isupper():
        return b
    else:
        return ''.join(sorted(a+b))

class Critter:
    def __init__(self, fgenes, mgenes):
        self.fgenes = fgenes
        self.mgenes = mgenes

    def species(self):
        g0 = subpheno(self.fgenes[0], self.mgenes[0])
        g1 = subpheno(self.fgenes[1], self.mgenes[1])

        return g0+' '+g1

    def hue(self):
        g2 = subpheno(self.fgenes[2], self.mgenes[2])
        g3 = subpheno(self.fgenes[3], self.mgenes[3])
        g4 = subpheno(self.fgenes[4], self.mgenes[4])
        return g2+g3+g4

    def color(self):
        g5 = subpheno(self.fgenes[5], self.mgenes[5])
        if len(g5) == 2:
            return 'X'
        return g5

halleles = ['H', 'h']
chromos = [[a,b,c,d,e,f]
           for a in ['A', 'b', 'c']
           for b in ['D', 'e', 'f']
           for c in halleles
           for d in halleles
           for e in halleles
           for f in ['X','y','z','w']]

s_phenos = {}
h_phenos = {}
c_phenos = {}

for m in chromos:
    for f in chromos:
        pheno = Critter(m,f).species()
        if pheno not in s_phenos:
            s_phenos[pheno] = 0
        s_phenos[pheno] += 1
        pheno = Critter(m,f).hue()
        if pheno not in h_phenos:
            h_phenos[pheno] = 0
        h_phenos[pheno] += 1
        pheno = Critter(m,f).color()
        if pheno not in c_phenos:
            c_phenos[pheno] = 0
        c_phenos[pheno] += 1
        #print "%10s   %10s   %10s" % (m, f, pheno)

def normalize(m):
    acc = sum(map(lambda x: x[1], m.items()))
    for k in m:
        m[k] = int(1000.0 * m[k] / acc)
    return m

print normalize(s_phenos)
print len(s_phenos)
print
print normalize(h_phenos)
print len(h_phenos)
print
print normalize(c_phenos)
print len(c_phenos)
