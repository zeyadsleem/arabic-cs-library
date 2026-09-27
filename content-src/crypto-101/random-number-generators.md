---
title: "مولّدات الأعداد العشوائية"
lang: en
---

## Random number generators

   The generation of random numbers is too important to be left to chance.

       *Robert R. Coveyou*

Introduction
#### Introduction

Many cryptographic systems require random numbers. So far, we've just
assumed that they're available. In this chapter, we'll go into more depth
about the importance and mechanics of random numbers in cryptographic
systems.

Producing random numbers is a fairly intricate process. Like with so
many other things in cryptography, it's quite easy to get it completely
wrong but have everything *look* completely fine to the untrained eye.

There are three categories of random number generation that we'll
consider separately:

-  True random number generators
-  Cryptographically secure pseudorandom number generators
-  Pseudorandom number generators

True random number generators
#### True random number generators

   Any one who considers arithmetical methods of producing random digits
   is, of course, in a state of sin.

       *John von Neumann*

John von Neumann, father of the modern model of computing, made an
obvious point. We can't expect to produce random numbers using
predictable, deterministic arithmetic. We need a source of randomness
that isn't a consequence of deterministic rules.

True random number generators get their randomness from physical
processes. Historically, many systems have been used for producing such
numbers. Systems like dice are still in common use today. However, for
the amount of randomness we need for practical cryptographic algorithms,
these are typically far too slow, and often quite unreliable.

We've since come up with more speedy and reliable sources of randomness.
There are several categories of physical processes that are used for
hardware random number generation:

-  Quantum processes
-  Thermal processes
-  Oscillator drift
-  Timing events

Keep in mind that not all of these options necessarily generate
high-quality, truly random numbers. We'll elaborate further on how they
can be applied successfully anyway.

Radioactive decay
### Radioactive decay

One example of a quantum physical process used to produce random numbers
is radioactive decay. We know that radioactive substances will slowly
decay over time. It's impossible to know when the next atom will decay;
that process is entirely random. Detecting when such a decay has
occurred, however, is fairly easy. By measuring the time between
individual decays, we can produce random numbers.

Shot noise
### Shot noise

Shot noise is another quantum physical process used to produce random
numbers. Shot noise is based on the fact that light and electricity are
caused by the movement of indivisible little packets: photons in the
case of light, and electrons in the case of electricity.

Nyquist noise
### Nyquist noise

An example of a thermal process used to produce random numbers is
Nyquist noise. Nyquist noise is the noise that occurs from charge
carriers (typically electrons) traveling through a medium with a certain
resistance. That causes a tiny current to flow through the resistor (or,
alternatively put, causes a tiny voltage difference across the
resistor).

```
i = \sqrt{\frac{4 k_B T \Delta_f}{R}}
```

```
v = \sqrt{4 k_B T R \Delta_f }
```

These formulas may seem a little scary to those who haven't seen the
physics behind them before, but don't worry too much: understanding them
isn't really necessary to go along with the reasoning. These formulas
are for the *root mean square*. If you've never heard that term before,
you can roughly pretend that means “average”. `\Delta f` is the
bandwidth, `T` is the temperature of the system in Kelvins,
`k_B` is Boltzmann's constant.

As you can see from the formula, Nyquist noise is *thermal*, or
temperature-dependent. Fortunately, an attacker generally can't use that
property to break the generator: the temperature at which it would
become ineffective is so low that the system using it has probably
already failed at that point.

By evaluating the formula, we can see that Nyquist noise is quite small.
At room temperature with reasonable assumptions (10 kHz bandwidth and a
1k\ `\Omega` resistor), the Nyquist voltage is in the order of
several hundred nanovolts. Even if you round up liberally to a microvolt
(a thousand nanovolts), that's still a thousandth of a thousandth of a
volt, and even a tiny AA battery produces 1.5V.

While the formulas describe the root mean square, the value you can
measure will be randomly distributed. By repeatedly measuring it, we can
produce high-quality random numbers. For most practical applications,
thermal noise numbers are quite high quality and relatively unbiased.

TODO: we've never actually explained the word entropy; “resistance an
attacker perceives” is necessary in a good definition

TODO: explain synchronous stream ciphers as CSPRNGs

Cryptographically secure pseudorandom generators
#### Cryptographically secure pseudorandom generators

While we'll see several examples of cryptographically secure
pseudorandom generators in the next few sections, keep in mind that they
are all just algorithms that *could* be used. As an application
developer, you should *never* be making a choice between one of them.

Instead, in the few cases you really want to pick a random number
manually, you should *always* use the cryptographically secure random
number generator provided by your operating system: `/dev/urandom` on
\*NIX (Linux, BSDs, and OS X), or `CryptGenRandom` on Windows. Python
provides handy interfaces to these in the form of `os.urandom` and
`random.SystemRandom`.

While they can be implemented securely, try to avoid using userspace
cryptographically secure random number generators such as the one in
OpenSSL. There are far more things that can go wrong with them, usually
involving their internal state: either they remain uninitialized, poorly
initialized, or end up re-using the same state in different locations.
In all of these cases, the resulting cryptosystem is completely and
utterly broken.

TODO: talk about the FUD in the Linux man page for urandom

advanced

   Since this is a specific cryptographically secure
   pseudorandom number generator algorithm, you don't actually need to
   know how it works to write good software. Just use ~urandom~.

Yarrow
#### Yarrow

advanced

The Yarrow algorithm is a cryptographically secure pseudorandom number
generator.

TODO: actually explain Yarrow

This algorithm is used as the CSPRNG for FreeBSD, and was inherited by
Mac OS X. On both of these operating systems, it's used to implement
`/dev/random`. Unlike on Linux, `/dev/urandom` is just an alias for
`/dev/random`.

Blum Blum Shub
#### Blum Blum Shub

TODO: explain this, and why it's good (provable), but why we don't use
it (slow)

`Dual_EC_DRBG`
#### ``Dual_EC_DRBG``

advanced

`Dual_EC_DRBG` is a NIST standard for a cryptographically secure
pseudorandom bit generator. It sparked a large amount of controversy:
despite being put forth as an official, federal cryptographic standard,
it quickly became evident that it wasn't very good.

Cryptanalysis eventually demonstrated that the standard could contain a
back door hidden in the constants specified by the standard, potentially
allowing an unspecified attacker to completely break the random number
generator.

Several years afterwards, leaked documents suggested a backdoor in an
unnamed NIST standard released in the same year as `Dual_EC_DRBG`,
fueling the suspicions further. This led to an official recommendation
from the standards body to stop using the standard, which was previously
unheard of under such circumstances.

Background
### Background

For a long time, the official standards produced by NIST lacked good,
modern cryptographically secure pseudorandom number generators. It had a
meager choice, and the ones that had been standardized had several
serious flaws.

NIST hoped to address this issue with a new publication called SP
800-90, that contained several new cryptographically secure pseudorandom
number generators. This document specified a number of algorithms, based
on different cryptographic primitives:

#. Cryptographic hash functions
#. HMAC
#. Block ciphers
#. Elliptic curves

Right off the bat, that last one jumps out. Using elliptic curves for
random number generation was unusual. Standards like these are expected
to be state-of-the-art, while still staying conservative. Elliptic
curves had been considered before in an academic context, but that was a
far cry from being suggested as a standard for common use.

There is a second reason elliptic curves seem strange. HMAC and block
ciphers are obviously symmetric algorithms. Hash functions have their
applications in asymmetric algorithms such as digital signatures, but
aren't themselves asymmetric. Elliptic curves, on the other hand, are
exclusively used for asymmetric algorithms: signatures, key exchange,
encryption.

That said, the choice didn't come entirely out of the blue. A choice for
a cryptographically secure pseudorandom number generator with a strong
number-theoretical basis isn't unheard of: Blum Blum Shub is a perfect
example. Those generators are typically much slower than the
alternatives. `Dual_EC_DRBG`, for example, is three orders of
magnitude slower than its peers presented in the same standard. The idea
is that the extra confidence inspired by the stronger mathematical
guarantees is worth the performance penalty. For example, we're fairly
confident that factoring numbers is hard, but we're a lot less sure
about our hash functions and ciphers. RSA came out in 1977 and has stood
the test of time quite well since then. DES came out two years later,
and is now considered completely broken. MD4 and MD5 came out over a
decade later, and are completely broken as well.

The problem is, though, that the standard didn't actually provide the
security proof. The standard specifies the generator but then merely
suggests that it would be at least as hard as solving the elliptic curve
discrete log problem. Blum Blum Shub, by contrast, has a proof that
shows that breaking it is at least as hard as solving the quadratic
residuosity problem. The best algorithm we have for that is factoring
numbers, which we're fairly sure is pretty hard.

The omission of the proof is a bit silly, because there's no reason
you'd use a pseudorandom number generator as slow as `Dual_EC_DRBG`
unless you had proof that you were getting something in return for the
performance hit.

Cryptographers later did the homework that NIST should have provided in
the specification `ecdrbg1` `ecdrbg2`.
Those analyses quickly highlighted a few issues.

A quick overview of the algorithm
### A quick overview of the algorithm

The algorithm consists of two parts:

#. Generating pseudorandom points on the elliptic curve, which are
   turned into the internal state of the generator;
#. Turning those points into pseudorandom bits.

We'll illustrate this graphically, with an illustration based on the
work by Shumow and Ferguson, two cryptographers who highlighted some of
the major issues with this algorithm:

![center](/images/crypto-101/fig-0-Diagram.svg)

center

Throughout the algorithm, `\phi` is a function that takes a curve
point and turns it into an integer. The algorithm needs two given points
on the curve: `P` and `Q`. These are fixed, and defined in
the specification. The algorithm has an internal state `s`. When
producing a new block of bits, the algorithm turns `s` into a
different value `r` using the `\phi` function and elliptic
curve scalar multiplication with `P`:

```
r = \phi(sP)
```

That value, `r`, is used both for producing the output bits and
updating the internal state of the generator. In order to produce the
output bits, a different elliptic curve point, `Q`, is used. The
output bits are produced by multiplying `r` with `Q`, and
running the result through a transformation `\theta`:

```
o = \theta(\phi(rQ))
```

In order to perform the state update, `r` is multiplied with
`P` again, and the result is converted to an integer. That integer
is used as the new state `s`.

```
s = \phi(rP)
```

Issues and question marks
### Issues and question marks

First of all, `\phi` is extremely simple: it just takes the
`x` coordinate of the curve point, and discards the `y`
coordinate. That means that it's quite easy for an attacker who sees the
output value of `\phi` to find points that could have produced
that value. In itself, that's not necessarily a big deal; but, as we'll
see, it's one factor that contributes to the possibility of a backdoor.

Another flaw was shown where points were turned into pseudorandom bits.
The `\theta` function simply discards the 16 most significant
bits. Previous designs discarded significantly more: for 256-bit curves
such as these, they discarded somewhere in the range of 120 and 175
bits.

Failing to discard sufficient bits gave the generator a small bias. The
next-bit property was violated, giving attackers a better than 50%
chance of guessing the next bit correctly. Granted, that chance was only
about one in a thousand better than 50%; but that's still unacceptable
for what's supposed to be the state-of-the-art in cryptographically
secure pseudorandom number generators.

Discarding only those 16 bits has another consequence. Because only 16
bits were discarded, we only have to guess `2^{16}` possibilities
to find possible values of `\phi(rQ)` that produced the output.
That is a very small number: we can simply enumerate all of them. Those
values are the outputs of `\phi`, which as we saw just returns the
`x` coordinate of a point. Since we know it came from a point on
the curve, we just have to check if our guess is a solution for the
curve equation:

```
y^2 \equiv x^3 + ax + b \pmod p
```

The constants `a, b, p` are specified by the curve. We've just
guessed a value for `x`, leaving only one unknown, `y`. We
can solve that quite efficiently. We compute the right hand side and see
if it's a perfect square:
`y^2 \equiv q \equiv \sqrt{x^3 + ax + b} \pmod p`. If it is,
`A = (x, \sqrt{q}) = (x, y)` is a point on the curve. This gives us a
number of possible points `A`, one of which is `rQ` used to
produce the output.

This isn't a big deal at face value. To find the state of the algorithm,
an attacker needs to find `r`, so they can compute `s`. They
still need to solve the elliptic curve discrete log problem to find
`r` from `rQ`, given `Q`. We're assuming that problem
is hard.

Keep in mind that elliptic curves are primitives used for asymmetric
encryption. That problem is expected to be hard to solve in general, but
what if we have some extra information? What if there's a secret value
`e` so that `eQ=P`?

Let's put ourselves in the shoes of an attacker knowing `e`. We
repeat our math from earlier. One of those points `A` we just
found is the `rQ` we're looking for. We can compute:

```
\phi(eA) \equiv \phi(erQ) \equiv \phi(rP) \pmod p
```

That last step is a consequence of the special relationship between
`e, P, Q`. That's pretty interesting, because `\phi(rP)` is
exactly the computation the algorithm does to compute `s`, the new
state of the algorithm! That means that an attacker that knows `e`
can, quite efficiently, compute the new state `s` from any output
`o`, allowing them to predict all future values of the generator!

This assumes that the attacker knows which `A` is the *right*
`A`. Because only 16 bits were discarded there are only 16 bits
left for us to guess. That gives us `2^{16}` candidate `x`
coordinates. Experimentally, we find that roughly half of the possible
`x` coordinates correspond to points on the curve, leaving us with
`2^{15}` possible curve points `A`, one of which is
`rQ`. That's a pretty small number for a bit of computer-aided
arithmetic: plenty small for us to try all options. We can therefore say
that an attacker that does know the secret value `e` most
definitely can break the generator.

So, we've now shown that if there is a magical `e` for which
`eQ=P`, and you can pick `P` and `Q` (and you don't
have to explain where you got them from), that you could break the
generator. How do you pick such values?

To demonstrate just how possible it is, the researchers started from the
NIST curve's `P` and `p` values, but came up with their own
`Q'`. They did this by starting with `P`, picking a random
`d` (keeping it secret), and setting `Q' = dP`. The trick is
that there's an efficient algorithm for computing `e` in
`eQ' = P` if you know the `d` in `Q' = dP`. This is the
`e` we need for our earlier attack. When they
tried this out, they discovered that in all cases (that is, for many
random `d`), seeing 32 bytes of output was enough to determine the
state `s`.

All of this, of course, only demonstrates that it is possible for the
specified values of `P` and `Q` to be special values with a
secret back door. It doesn't provide any evidence that the *actual*
values have a backdoor in them. However, given that the standard never
actually explains *how* they got the magical value for `Q`, it
doesn't really inspire a lot of confidence. Typically, cryptographic
standards use “nothing-up-my-sleeve” numbers, such as the value of some
constant such as `\pi` or the natural logarithm base, `e`.

If someone does know the backdoor, the consequences are obviously
devastating. We've already argued for the necessity of cryptographically
secure pseudorandom number generators: having a broken one essentially
means that all cryptosystems that use this generator are completely and
utterly defeated.

There are two ways one might try to fix this particular algorithm:

-  Make the `\theta` function more complex to invert, rather than
   just discarding 16 bits. This makes it harder to find candidate
   points, and hence, harder to perform the attack. One obvious way
   would be to discard more bits. Another option would be to use a
   cryptographically secure hash, or a combination of both.
-  Generate random `Q` every time you start the algorithm,
   possibly by picking a random `d` and setting `Q = dP`. Of
   course, `d` has to be sufficiently large and truly random: if
   `\theta` is unchanged, and there are only a few values
   `d` can have, the attacker can just perform the above attack
   for all values of `d`.

Both of these are really just band-aid solutions; it would be a much
better idea to just use a different algorithm altogether. These
suggestions don't resolve the issue that it's slow, exotic, and now a
retracted standard.

Aftermath
### Aftermath

TODO: Talk about RSA guy's comments + snowden leaks

Mersenne Twister
#### Mersenne Twister

Mersenne Twister is a very common pseudorandom number generator. It has
many nice properties, such as high performance, a huge period [#]_ of
`2^{19937} - 1 \approx 4 \cdot 10^{6001}`, and it passes all but
the most demanding randomness tests. Despite all of these wonderful
properties, it is *not* cryptographically secure.

.. [#]
   The period of a pseudorandom number generator is how many random
   numbers it produces before the entire sequence repeats.

An in-depth look at the Mersenne Twister
### An in-depth look at the Mersenne Twister

advanced

To demonstrate why Mersenne Twister isn't cryptographically secure,
we'll take a look at how the algorithm works. Fortunately, it's not very
complex.

The standard Mersenne Twister algorithm operates on an internal state
array `S` consisting of 624 unsigned 32-bit integers, and an index
`i` pointing to the current integer. It consists of three steps:

#. An optional initialization function, which produces an initial state
   from a small random value called a *seed*.
#. A state generation function, which produces a new state from the old
   state.
#. An extraction function, also called the *tempering* function, that
   produces a random number from the current element of the state (the
   element pointed at by the index `i`).

Whenever the extraction function is called, the index to the current
integer is incremented. When all of the current elements of the state
have been used to produce a number, the state generation function is
called again. The state initialization function is called right
before the first number is extracted.

So, to recap: the state is regenerated, then the extraction function
goes over each of the elements in the state, until it runs out. This
process repeats indefinitely.

TODO: illustrate

We'll look at each of the parts briefly. The exact workings of them is
outside the scope of this book, but we'll look at them just long enough
to get some insight into why Mersenne Twister is unsuitable as a
cryptographically secure random number generator.

The initialization function
### The initialization function

The initialization function creates an instance of Mersenne Twister's
state array, from a small initial random number called a *seed*.

The array starts with the seed itself. Then, each next element is
produced from a constant, the previous element, and the index of the new
element. Elements are produced until there are 624 of them.

Here's the Python source code:

```
def uint32(n):
    return 0xFFFFFFFF & n

def initialize_state(seed):
    state = [seed]

    for i in range(1, 624):
        prev = state[-1]
        elem = 0x6c078965 * (prev ^ (prev >> 30)) + i
        state.append(uint32(elem))

    return state
```

For those of you who haven't worked with Python or its bitwise
operators:

-  `>>` and `<<` are right-shift and left-shift
-  `&` is binary AND: `0 \& 0 = 0 \& 1 = 1 \& 0 = 0`, and
   `1 \& 1 = 1`.
-  `^` is binary XOR, `^=` XORs and assigns the result to the name
   on the left-hand side, so `x ^= k` is the same thing as
   `x = x ^ k`.

REVIEW: Bitwise arithmetic appendix?

The state regeneration function
### The state regeneration function

The state regeneration function takes the current state and produces a
new state. It is called right before the first number is extracted, and
every time all 624 elements of the state have been used up.

The Python source code for this function is fairly simple. Note that it
modifies the state array in place, instead of returning a new one.

```
def regenerate(s):
    for i in range(624):
        y = s[i] & 0x80000000
        y += s[(i + 1) % 624] & 0x7fffffff

        z = s[(i + 397) % 624]
        s[i] = z ^ (y >> 1)

        if y % 2:
            s[i] ^= 0x9908b0df
```

The `%` in an expression like `s[(i + n) % 624]` means that a next
element of the state is looked at, wrapping around to the start of the
state array if there is no next element.

The values `0x80000000` and `0x7fffffff` have a specific meaning
when interpreted as sequences of 32 bits. `0x80000000` has only the
first bit set; `0x7fffffff` has every bit except the first bit set.
Because these are bitwise AND'ed together (`&`), this effectively
means that after the first two lines in the loop, `y` consists of the
first bit of the current state element and all the subsequent bits of
the next element.

The tempering function
### The tempering function

The tempering function is applied to the current element of the state
before returning it as the produced random number. It's easier to just
show the code instead of explaining how it works:

```
_TEMPER_MASK_1 = 0x9d2c5680
_TEMPER_MASK_2 = 0xefc60000

def temper(y):
    y ^= uint32(y >> 11)
    y ^= uint32((y << 7) & _TEMPER_MASK_1)
    y ^= uint32((y << 15) & _TEMPER_MASK_2)
    y ^= uint32(y >> 18)
    return y
```

It may not be obvious, especially if you're not used to binary
arithmetic, but this function is *bijective* or *one-to-one*: each 32
bit integer input maps to exactly one output, and vice versa: for each
32 bit integer we get as an output there was exactly one 32 bit integer
it could have come from. Because it uses right and left shifts, it might
look like it throws away data at first glance, and hence can't possibly
be reversible. It's true that those shifts throw some bits away,
however, the critical operation here is the inline XOR (`^=`): those
shifts are just used to compute masks that the value to be tempered is
XOR'd with. The XOR operations themselves are reversible, and because
each independent operation is reversible, their composition is too.

Because the tempering function is one-to-one, there is an inverse
function: a function that gives you the untempered equivalent of a
number. It may not be obvious to you how to construct that function
unless you're a bitwise arithmetic wizard, but that's okay; in the worst
case scenario we could still brute-force it. Suppose we just try every
single 32 bit integer, and remember the result in a table. Then, when we
get a result, we look it up in the table, and find the original. That
table would have to be at least `2^{32} \cdot 32` bits in length,
or a good 17 gigabytes; big, but not impossibly so.

Fortunately, there's a much simpler method to compute the inverse of the
temper function. We'll see why that's interesting when we evaluate the
cryptographic security of the Mersenne Twister in the next section. For
those interested in the result, the untempering function looks like
this:

```
def untemper(y):
    y ^= y >> 18
    y ^= ((y << 15) & _TEMPER_MASK_2)

    y = _undo_shift_2(y)
    y = _undo_shift_1(y)

    return y

def _undo_shift_2(y):
    t = y

    for _ in range(5):
        t <<= 7
        t = y ^ (t & _TEMPER_MASK_1)

    return t

def _undo_shift_1(y):
    t = y

    for _ in range(2):
        t >>= 11
        t ^= y

    return t
```

Cryptographic security
### Cryptographic security

Remember that for cryptographic security, it has to be impossible to
predict future outputs or recover past outputs given present outputs.
The Mersenne Twister doesn't have that property.

It's clear that pseudorandom number generators, both those
cryptographically secure and those that aren't, are entirely defined by
their internal state. After all, they are deterministic algorithms:
they're just trying very hard to pretend not to be. Therefore, you could
say that the principal difference between cryptographically secure and
ordinary pseudorandom number generators is that the cryptographically
secure ones shouldn't leak information about their internal state,
whereas it doesn't matter for regular ones.

Remember that in Mersenne Twister, a random number is produced by taking
the current element of the state, applying the tempering function, and
returning the result. We've also seen that the tempering function has an
inverse function. So, if I can see the output of the algorithm and apply
the inverse of the tempering function, I've recovered one element out of
the 624 in the state.

Suppose that I happen to be the only person seeing the outputs of the
algorithm, and you begin at the start of the state, such as with a fresh
instance of the algorithm, that means that I can clone the state by just
having it produce 624 random numbers.

Even if an attacker doesn't see all 624 numbers, they can often still
recreate future states, thanks to the simple relations between past
states and future states produced by the state regeneration function.

Again, this is not a weakness of Mersenne Twister. It's designed to be
fast and have strong randomness properties. It is not designed to be
unpredictable, which is the defining property of a cryptographically
secure pseudorandom number generator.
