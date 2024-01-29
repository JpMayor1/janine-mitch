'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

import { MdEmail, MdPassword } from "react-icons/md"
import { Button, Input } from "@material-tailwind/react"
import { FaUser } from "react-icons/fa"
import { User } from "@/lib/types"
import { useUser } from "@/lib/globalStore"
import { useRouter } from "next/navigation"
import AlertDialog from "@/components/AlertDialog"

function Register() {
  const user = useUser()
  const router = useRouter()
  const [form, setForm] = useState<{ username?: string, email?: string, password?: string, confirmPassword?: string }>({})

  const [loading, setLoading] = useState<boolean>(false)
  const [matched, setMatched] = useState<boolean | null>(null)
  const [status, setStatus] = useState<{ state: boolean, message: string } | null>(null)

  useEffect(() => {
    if (user.value.id) {
      router.push('/organization');
    }

  }, [user.value])

  const Submit = async () => {
    if (!form.username) {
      setStatus({ state: false, message: '[ClientError]: Username is required!' });
      return;
    }

    if (!form.email) {
      setStatus({ state: false, message: '[ClientError]: Email is required!' });
      return;
    }

    if (!form.password) {
      setStatus({ state: false, message: '[ClientError]: Password is required!' });
      return;
    }

    if (!form.confirmPassword) {
      setStatus({ state: false, message: '[ClientError]: You must confirm your password' });
      return;
    }

    if (!matched) {
      setStatus({ state: false, message: '[ClientError]: Your password must match!' });
      return;
    }

    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    if (res.status === 201) {
      const userdata: User = await res.json();
      user.write({
        id: userdata.id,
        role: userdata.role,
        email: userdata.email,
        username: userdata.username
      });

      setStatus({ state: true, message: '[AuthAPI]: Successfully Registered!' });
    }
    else {
      setStatus({ state: false, message: '[AuthAPI]: Invalid Credentials!' });
    }

    setLoading(false);
  }

  const matcher = (text1: string, text2: string) => {
    if (text1.length === 0) return null;
    if (text2.length === 0) return null;

    if (text1 === text2) {
      return true;
    }
    else return false;
  }

  return (
    <div className="w-full h-full flex flex-col center">
      <div className="w-full 2xl:w-1/5">
        <AlertDialog
          show={status ? true : false}
          onClose={() => setStatus(null)}
          isError={status ? status.state : undefined}
          color={status !== null ? status.state ? 'green' : 'red' : undefined}
          message={status ? status.message : undefined}
        />
      </div>
      <div className="w-full 2xl:w-1/5 p-8 border rounded-lg shadow-sm bg-gray-50 text-blue-gray-500">
        <div className="w-full my-5">
          <div className="text-3xl text-center font-semibold">Register</div>
        </div>

        <form action="" className="w-full my-10">
          <div className="w-full my-5">
            <Input
              required
              type="text"
              id="username"
              name="username"
              label="Username"
              icon={<FaUser />}
              onChange={(ev) => setForm({ ...form, username: ev.target.value })}
            />
          </div>

          <div className="w-full my-5">
            <Input
              required
              type="email"
              id="email"
              name="email"
              label="Email"
              icon={<MdEmail />}
              onChange={(ev) => setForm({ ...form, email: ev.target.value })}
            />
          </div>

          <div className="w-full my-5">
            <Input
              required
              id="password"
              name="password"
              type="password"
              label="Password"
              icon={<MdPassword />}
              error={matched !== null ? !matched : undefined}
              onChange={(ev) => {
                setForm({ ...form, password: ev.target.value });
                if (form.confirmPassword) {
                  setMatched(matcher(ev.target.value, form.confirmPassword));
                  return;
                }

                return;
              }}
            />
          </div>

          <div className="w-full my-5">
            <Input
              required
              id="confirm-password"
              name="confirm-password"
              type="password"
              label="Confirm Password"
              icon={<MdPassword />}
              error={matched !== null ? !matched : undefined}
              onChange={(ev) => {
                setForm({ ...form, confirmPassword: ev.target.value })
                if (form.password) {
                  setMatched(matcher(ev.target.value, form.password));
                  return;
                }

                return;
              }}
            />
          </div>

          <div className="w-full my-5">
            <Button
              fullWidth
              loading={loading}
              className="row center"
              onClick={() => Submit()}
            >
              <span>Signup</span>
            </Button>
          </div>

          <div className="w-full my-5 text-center">
            <span>Already have an account?</span>
            <Link href={'/'} className="text-base mx-1 text-blue-400 hover:underline">
              Sign-in
            </Link>
            <span>instead!</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register