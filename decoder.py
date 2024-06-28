def decode(file):
    message = ""
    value = 1
    count = 1
    with open(file) as file:
        lines = file.read().splitlines()
        while True: 
            amended = False
            for line in lines:
                num, word = line.split(' ')
                if int(num) == value:
                    message += word + ' '
                    count += 1
                    value += count
                    amended = True
            if not amended:
                break
    return message

print(decode("coding_qual_input.txt"))