def fibo(fibo1, fibo2):
    l = [0]*8
    f1 = fibo1
    f2 = fibo2
    for i in range(8):
        if i == 0:
            l[i] = f1
        elif i == 1:
            l[i] = f2
        else:
            k = fibo1+fibo2
            l[i] = k
            fibo1 = fibo2
            fibo2 = k
    return l


def dec_to_base(num, base):
    base_num = ""
    while num > 0:
        dig = int(num % base)
        if dig < 10:
            base_num += chr(dig+97)
        else:
            base_num += chr(ord('a')+dig-10)
        num //= base
    base_num = base_num[::-1]
    return base_num


def f_to_h(fibo_list):
    s = ''
    for i in fibo_list:
        s += dec_to_base(i, 25)
    return s


class Universe:

    def __init__(self, fibo1, fibo2):
        self.name = str(fibo1)+'-'+str(fibo2)
        self.hex = f_to_h(fibo(fibo1, fibo2))
        self.energy = fibo1+fibo2
        self.links = 0
        self.traveler = False

    def isTraveler(self):
        return self.traveler

    def __str__(self):
        s = 'Universe '+self.name+'\n'
        s += 'Image base: '+self.hex+'\n'
        s += 'Energy to Escape: '+str(self.energy)+'\n'
        s += 'Links: '+str(self.links)+'\n'
        return s
